#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
需求：#80062# 光大银行显示分行PUE top排名
用法：
    1.根据现场情况，先修改以下配置:top、after测点ID，分行实时pue测点id与分行名称对应关系
    2.将set_pue_top.py上传到后台/opt/data/upload目录下
    3.策略里添加执行脚本，脚本输入框填写: /usr/local/xbrother_python/bin/python  /opt/data/upload/set_pue_top.py
"""
import json

from redis.connection import ConnectionPool
import pika
import redis
import sys
import os
import time
import requests
from datetime import datetime

#实时pue排名top测点ID，值越小排名越高，按top顺序填写
top_id = ["0_146_1_10026_0","0_146_1_10027_0","0_146_1_10028_0","0_146_1_10029_0","0_146_1_10030_0"]
#实时pue排名after测点ID，值越大排名越高，按after顺序填写
after_id = ["0_146_1_10031_0","0_146_1_10032_0","0_146_1_10033_0","0_146_1_10034_0","0_146_1_10035_0"]
#各分行实时pue测点id与分行名称对应关系
node_map = {
    "0_142_1_10008_0":"成都分行", 
    "0_142_1_10009_0":"重庆分行", 
    "0_142_1_10010_0":"北京分行", 
    "0_142_1_10011_0":"南宁分行", 
    "0_142_1_10012_0":"大连分行",
    "0_142_1_10013_0":"兰州分行", 
    "0_142_1_10014_0":"广州分行", 
    "0_142_1_10015_0":"杭州分行",
    }


class Publisher(object):
    def __init__(self, host = 'localhost', port = 5672, username = 'gj', password = 'xbrother', heartbeat_interval = 0, connection_attempts = 9999, retry_delay = 1, socket_timeout = 3, exchange = 'exchange', exchange_type = 'topic', exchange_durable = True, exchange_auto_delete = False, queue = 'queue', queue_durable = True, queue_auto_delete = False, queue_ttl = 0, routing_key = '#', no_ack = True):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.heartbeat_interval = heartbeat_interval
        self.connection_attempts = connection_attempts
        self.retry_delay = retry_delay
        self.socket_timeout = socket_timeout
        self.exchange = exchange
        self.exchange_type = exchange_type
        self.exchange_durable = exchange_durable
        self.exchange_auto_delete = exchange_auto_delete
        self.queue = queue
        self.queue_durable = queue_durable
        self.queue_auto_delete = queue_auto_delete
        self.queue_ttl = queue_ttl
        self.routing_key = routing_key
        self.no_ack = no_ack
        self._connection = None
        self._channel = None
        self._properties = pika.BasicProperties(content_type='application/json', delivery_mode=2, content_encoding='utf-8', priority=0, headers='')
    def open_connection(self):
        if self._connection:
            if self._connection.is_closing:
                self._connection = None
            if self._connection.is_open:
                return self._connection
        parameters = pika.ConnectionParameters(host=self.host, port=self.port, credentials=pika.PlainCredentials(self.username, self.password), heartbeat_interval=self.heartbeat_interval, connection_attempts=self.connection_attempts, retry_delay=self.retry_delay, socket_timeout=self.socket_timeout)
        self._connection = pika.BlockingConnection(parameters)
        return self._connection
    def open_channel(self):
        if self._channel:
            if self._channel.is_closing:
                self._channel = None
            if self._channel.is_open:
                return self._channel
        self._channel = self._connection.channel()
        self._setup_queue()
    def close_channel(self):
        try:
            if self._channel:
                self._channel.close()
                self._channel = None
        except Exception as ee:
            print (ee)
            self._channel = None
    def close_connection(self):
        try:
            if self._connection:
                self._connection.close()
                self._connection = None
        except Exception as ee:
            print (ee)
            self._connection = None
    def close(self):
        self.close_channel()
        self.close_connection()
    def _setup_queue(self):
        if self.queue:
            arguments = {}
            if self.queue_ttl > 0:
                arguments['x-message-ttl'] = self.queue_ttl * 1000
            self._channel.queue_declare(queue=self.queue, durable=self.queue_durable, auto_delete=self.queue_auto_delete, arguments=arguments)
    def publisher_data(self, data):
        if not self._connection or not self._connection.is_open:
            self.open_connection()
        if not self._channel or not self._channel.is_open:
            self.open_channel()
        try:
            return self._channel.basic_publish(exchange=self.exchange, routing_key=self.routing_key, body=json.dumps(data), properties=self._properties)
        except Exception as ee:
            print (ee)
            self.close()
            self.open_connection()
            self.open_channel()
            return False
    def publisher_data_ext(self, data, exchange, routing_key):
        if not self._connection or not self._connection.is_open:
            self.open_connection()
        if not self._channel or not self._channel.is_open:
            self.open_channel()
        try:
            return self._channel.basic_publish(exchange=exchange, routing_key=routing_key, body=json.dumps(data), properties=self._properties)
        except Exception as ee:
            print (ee)
            self.close()
            self.open_connection()
            self.open_channel()
            return False

class Redis(object):
    def __init__(self, host="127.0.0.1", port=6379, password=""):
        self.host = host
        self.port = port
        self.password = password
        pool = redis.ConnectionPool(host=self.host, port=self.port, password=self.password)
        self.conn = redis.Redis(connection_pool=pool)

    def set(self, key, value):
        key = "SPOTS:" + key
        self.conn.set(key, value)

    def get(self, key):
        key = "SPOTS:" + key
        if isinstance(key, list):
            return self.conn.mget(key)
        else:
            return self.conn.get(key)


if __name__ == "__main__":
    print("start")
    env_file = "/etc/xbrother.env"
    env = {}
    with open(env_file, "r") as fileHandler:
        for line in fileHandler:
            if line.strip() == "":
                continue
            l = line.strip().split("=")
            env[l[0]] = l[1]

    redis_conn = Redis(
        host = env["REDIS_HOST"],
        port = env["REDIS_PORT"],
        password = env["REDIS_PASSWD"]
    )

    p = Publisher(
        host = env["RABBITMQ_HOST"],
        port = int(env["RABBITMQ_PORT"]),
        username = env["RABBITMQ_USER"],
        password = env["RABBITMQ_PASSWD"],
        heartbeat_interval = 0,
        connection_attempts = 9999,
        retry_delay = 1,
        socket_timeout = 3,
        exchange = 'fss_inner_exchange',
        exchange_type = 'topic',
        routing_key = 'fss.inner.value.#')

    url = "http://127.0.0.1:5001/api/v2/tsdb/status/last"
    data = {"resources":[]}
    for id in node_map.keys():
        data['resources'].append({"resource_id":id})
    resp = requests.post(url, json= data)
    res = json.loads(resp.text)
    if res['error_msg'] != "Succeed":
        print(res)
        exit
    pue_val = {}
    for r in res['data']['resources']:
        pue_val[node_map[r['resource_id']]] = r['real_value']

    values = []
    pue_sorted = sorted(pue_val.items(), key=lambda d: d[1])
    i = 0
    for name, pue in pue_sorted:
        if i >= len(top_id):
            break
        values.append({"resource_id": str(top_id[i]), "value": str(name)})
        i+=1
    
    pue_sorted = sorted(pue_val.items(), key=lambda d: d[1], reverse=True)
    i = 0
    for name, pue in pue_sorted:
        if i >= len(top_id):
            break
        values.append({"resource_id": str(after_id[i]), "value": str(name)})
        i+=1
    p.publisher_data({"value_source": "strategy", "values": values})