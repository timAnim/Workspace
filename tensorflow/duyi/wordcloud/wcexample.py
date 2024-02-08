# -*- coding: utf-8 -*-

import wordcloud

fp=open("wordcloud.txt")
text=fp.read()
WordCloud = wordcloud.WordCloud().generate(text)
image_produce = WordCloud.to_image()
image_produce.show()

