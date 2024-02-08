# -*- coding: utf-8 -*-
"""
Created on Thu Jun 25 17:58:08 2020

@author: Dr. Tang


http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&fm=index&pos=history&word=%E7%8B%97
"""
#
import os
import re
import urllib 
import requests 
from PIL import Image
from PIL import UnidentifiedImageError

#第一步是生成不同页面的URL
def getPage(keyword,page,n):#page就是pagebegin n就是pagenumber
    page=page*n
    keyword=urllib.parse.quote(keyword, safe='/')
    url_begin= "http://image.baidu.com/search/flip?tn=baiduimage&ie=utf-8&word="
    url = url_begin+ keyword+ "&pn=" +str(page) + "&gsm="+str(hex(page))+"&ct=&ic=0&lm=-1&width=0&height=0"
    
    return url
 
    
#第二步是拿到所有图片的网址
def get_onepage_urls(onepageurl):
    try:
        html = requests.get(onepageurl)
        html.raise_for_status()
        html=html.text
    except Exception as e:
        print(e)
        pic_urls = []
        return pic_urls
    pic_urls = re.findall(r'"objURL":"(.*?)",', html, re.I)
    return pic_urls
 
#第三步把拿到网址中所有的图片都下载下来。
def down_pic(keyword,pic_urls):
    """给出图片链接列表, 下载所有图片"""
    for i, pic_url in enumerate(pic_urls):
        try:
            pic = requests.get(pic_url, timeout=15)
            pic.raise_for_status()
            string =keyword+'/'+str(i + 1) + '.jpg'
            with open(string, 'wb') as f:
                f.write(pic.content)
                
            img=Image.open(string)
            print('成功下载第%s张图片: %s' % (str(i + 1), str(pic_url)))
            del img
        except UnidentifiedImageError:
            print("下载图片有问题！")
            os.remove(string)
        except Exception as e:
            print('下载第%s张图片时失败: %s' % (str(i + 1), str(pic_url)))

            print(e)
            continue
 
 
if __name__ == '__main__':
    keyword = '狗'     # 关键词, 改为你想输入的词即可, 相当于在百度图片里搜索一样
    page_begin=0
    page_number=20
    image_number=3
    all_pic_urls = []
  
    os.makedirs(keyword)
    while 1:
        if page_begin>image_number:
            break
        print("第%d次请求数据"%(page_begin+1))
        url=getPage(keyword,page_begin,page_number)
        print(url)
        onepage_urls= get_onepage_urls(url)
        page_begin += 1
 
        all_pic_urls.extend(onepage_urls)
 
    down_pic(keyword,list(set(all_pic_urls)))