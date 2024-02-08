# -*- coding: utf-8 -*-

import requests
from bs4 import BeautifulSoup
import re
Headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}

def getHTMLText(url):
    try:
        r = requests.get(url,timeout=30,headers=Headers)
        r.raise_for_status()
        r.enconding = "utf-8"
        return r.text
    except:
        print("连接出错！！")
        return ""
    
def fillBookdata(commentsdata,html):
    soup = BeautifulSoup(html, 'html.parser')
    commmentinfo = soup.find_all('span', 'comment-info')

    pattern = re.compile('allstar(\d+) rating')
    p = re.findall(pattern, str(commmentinfo))
    comments = soup.find_all('span', 'short')
    for i in range(1,len(comments)):
        commentsdata.append( [commmentinfo[i-1].a.text,comments[i].string,p[i-1]])


def printList(movieData,num):
    for i in range(num):
        u = movieData[i]
        print("序号:{}\n用户名:{}\n评论内容:{}\n评分:{}星\n".format(i + 1,u[0], u[1],int(int(u[2])/10)))

def main(url):
    commentsdata = []

    html = getHTMLText(url)
    fillBookdata(commentsdata,html)
    printList(commentsdata,len(commentsdata))

url="https://movie.douban.com/subject/1292052/"
main(url)