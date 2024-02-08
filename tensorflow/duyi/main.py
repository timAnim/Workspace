# -*- coding: utf-8 -*-
"""
Created on Wed Jun 24 16:59:36 2020

@author: admin
"""

import argparse
import obj

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port","-p",type=int,help="端口号")
    
    args = parser.parse_args()
    
    print(args.port)
    print(obj)


if __name__ == '__main__':
    main()