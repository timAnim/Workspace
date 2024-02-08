# !/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import time

import json
import requests

import random
from redis import StrictRedis

# reload(sys)
# sys.setdefaultencoding('utf-8')

#####################################################################################################################
# mq publisher begin
import pika


class Publisher(object):

    def __init__(self, host='localhost', port=5672, username='gj', password='xbrother', heartbeat_interval=0, connection_attempts=9999, retry_delay=1, socket_timeout=3, exchange='exchange', exchange_type='topic', exchange_durable=True, exchange_auto_delete=False, queue='queue', queue_durable=True, queue_auto_delete=False, queue_ttl=0, routing_key='#', no_ack=True):

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
        self._properties = pika.BasicProperties(
            content_type='application/json', delivery_mode=2, content_encoding='utf-8', priority=0, headers='')

    def open_connection(self):
        if self._connection:
            if self._connection.is_closing:
                self._connection = None
            if self._connection.is_open:
                return self._connection
        parameters = pika.ConnectionParameters(host=self.host, port=self.port, credentials=pika.PlainCredentials(
            self.username, self.password), heartbeat_interval=self.heartbeat_interval, connection_attempts=self.connection_attempts, retry_delay=self.retry_delay, socket_timeout=self.socket_timeout)
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
            self._channel = None

    def close_connection(self):
        try:
            if self._connection:
                self._connection.close()
                self._connection = None
        except Exception as ee:
            self._connection = None

    def close(self):
        self.close_channel()
        self.close_connection()

    def _setup_queue(self):
        if self.queue:
            arguments = {}
            if self.queue_ttl > 0:
                arguments['x-message-ttl'] = self.queue_ttl * 1000
            self._channel.queue_declare(queue=self.queue, durable=self.queue_durable,
                                        auto_delete=self.queue_auto_delete, arguments=arguments)

    def publisher_data(self, data):
        if not self._connection or not self._connection.is_open:
            self.open_connection()
        if not self._channel or not self._channel.is_open:
            self.open_channel()
        try:
            # print self.host
            # print self.port
            # print self.exchange
            # print self.routing_key
            # return self._channel.basic_publish(exchange=self.exchange, routing_key=self.routing_key, body=json.dumps(data), properties=self._properties)
            return self._channel.basic_publish(exchange=self.exchange, routing_key=self.routing_key, body=json.dumps(data))
        except Exception as ee:
            print(ee)
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
            self.close()
            self.open_connection()
            self.open_channel()
            return False

# mq publisher end
#####################################################################################################################

#####################################################################################################################
# redis-cli start


class Rtdb(object):
    def __init__(self, host='localhost', port=6379, username='', password='Xbrother*123'):
        self.cli = StrictRedis(host, port, username, password)

    def get(self, rid):
        v = self.cli.get("SPOTS:" + rid)
        return json.loads(v)

# redis-cli end
#####################################################################################################################


class Simulator(object):
    """
    TCP传输方法
    """

    def __init__(self):
        self.publisher = Publisher(
            exchange="fss_inner_exchange",
            routing_key="fss.inner.value.#"
        )

        if len(sys.argv) > 0:
            self.point_id = sys.argv[1]
        else:
            self.point_id = '0_5259_1_10003_0'

        self.rtdb = Rtdb()
        print(self.point_id)

    def publish(self, vs):
        sv = {
            "value_source": "strategy",
            "values": vs
        }
        self.publisher.publisher_data(sv)

    def build_v(self, rid, v):
        return {
            "resource_id": rid,
            "value": v
        }

    def gen(self, rid, val):
        try:
            vs = []
            vs.append(self.build_v(rid, val))
            print(val)
            self.publish(vs)
        except Exception as ee:
            print(ee)


if __name__ == "__main__":

    r = Rtdb()
    val = ''
    rid = ''
    if len(sys.argv) > 0:
        rid = sys.argv[1]
        # val = r.get(rid)
        # if(val.has_key('label')):
        #     val = val['label']
        #     print(val)
        data ={
            "resources":[
                {
                    "resource_id": rid
                }
            ]
        }

        url = "http://127.0.0.1:5001/api/v2/tsdb/status/last"

        rep = requests.post(url, json = data)
        val = json.loads(rep.text)
    
    if (len(sys.argv) > 1 and val.has_key('data')):
        labels = json.loads(rep.text)['data']['resources'][0]
        print(labels)
        s = Simulator()
        if(labels.has_key('labels') and labels['labels']):
            json.loads(labels['labels'])['test_scheme']
            s.gen(sys.argv[2], json.loads(labels['labels'])['test_scheme'])
        else:
            s.gen(sys.argv[2], labels['real_value'])
