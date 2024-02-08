package modbus

// define swagger doc 
const (
	Swagger = `{
  "swagger": "2.0",
  "info": {
    "title": "modbus.proto",
    "version": "version not set"
  },
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/modbus/coil/ctrl": {
      "post": {
        "summary": "设置02功能码寄存器信息",
        "operationId": "XModbus_CoilCtrl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusCoilCtrlResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusCoilCtrlReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/coil/list": {
      "get": {
        "summary": "获取01功能码寄存器信息",
        "operationId": "XModbus_GetCoils",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusGetCoilResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "index",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          },
          {
            "name": "size",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/coil/register": {
      "post": {
        "summary": "设置02功能码寄存器信息",
        "operationId": "XModbus_SetCoil",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusSetCoilResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusSetCoilReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/dinput/ctrl": {
      "post": {
        "summary": "设置02功能码寄存器信息",
        "operationId": "XModbus_DiscreteInputCtrl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusDiscreteInputCtrlResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusDiscreteInputCtrlReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/dinput/list": {
      "get": {
        "summary": "获取02功能码寄存器信息",
        "operationId": "XModbus_GetDiscreteInputs",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusGetDiscreteInputResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "index",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          },
          {
            "name": "size",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/dinput/register": {
      "post": {
        "summary": "设置02功能码寄存器信息",
        "operationId": "XModbus_SetDiscreteInput",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusSetDiscreteInputResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusSetDiscreteInputReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/holding/ctrl": {
      "post": {
        "summary": "设置03功能码寄存器随机",
        "operationId": "XModbus_HoldingRegisterCtrl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusHoldingRegisterCtrlResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusHoldingRegisterCtrlReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/holding/list": {
      "get": {
        "summary": "获取03功能码寄存器信息",
        "operationId": "XModbus_GetHoldingRegisters",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusGetHoldingRegisterResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "index",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          },
          {
            "name": "size",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/holding/range": {
      "post": {
        "summary": "设置03功能码寄存器范围",
        "operationId": "XModbus_SetHoldingRange",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusSetHoldingRangeResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusSetHoldingRangeReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/holding/register": {
      "post": {
        "summary": "设置03功能码寄存器信息",
        "operationId": "XModbus_SetHoldingRegister",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusSetHoldingRegisterResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusSetHoldingRegisterReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/input/ctrl": {
      "post": {
        "summary": "设置04功能码寄存器随机",
        "operationId": "XModbus_InputRegisterCtrl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusInputRegisterCtrlResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusInputRegisterCtrlReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/input/list": {
      "get": {
        "summary": "获取04功能码寄存器信息",
        "operationId": "XModbus_GetInputRegisters",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusGetInputRegisterResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "index",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          },
          {
            "name": "size",
            "in": "query",
            "required": false,
            "type": "integer",
            "format": "int32"
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/input/range": {
      "post": {
        "summary": "设置04功能码寄存器范围",
        "operationId": "XModbus_SetInputRange",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusSetInputRangeResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusSetInputRangeReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/input/register": {
      "post": {
        "summary": "设置04功能码寄存器信息",
        "operationId": "XModbus_SetInputRegister",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusSetInputRegisterResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/modbusSetInputRegisterReq"
            }
          }
        ],
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/rtu/list": {
      "get": {
        "summary": "获取 modbus RTU 协议地址列表",
        "operationId": "XModbus_GetRTUAddrs",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusGetRTUAddrResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/tcp/list": {
      "get": {
        "summary": "获取 modbus TCP 协议地址列表",
        "operationId": "XModbus_GetTCPAddrs",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusGetTCPAddrResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "tags": [
          "XModbus"
        ]
      }
    },
    "/modbus/tty/list": {
      "get": {
        "summary": "获取 modbus RTU 串口地址列表",
        "operationId": "XModbus_GetTTYAddrs",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/modbusGetTTYAddrResp"
            }
          },
          "default": {
            "description": "An unexpected error response",
            "schema": {
              "$ref": "#/definitions/runtimeError"
            }
          }
        },
        "tags": [
          "XModbus"
        ]
      }
    }
  },
  "definitions": {
    "modbusBitGroupRegister": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "hex": {
          "type": "string"
        },
        "bit7": {
          "type": "integer",
          "format": "int32"
        },
        "bit6": {
          "type": "integer",
          "format": "int32"
        },
        "bit5": {
          "type": "integer",
          "format": "int32"
        },
        "bit4": {
          "type": "integer",
          "format": "int32"
        },
        "bit3": {
          "type": "integer",
          "format": "int32"
        },
        "bit2": {
          "type": "integer",
          "format": "int32"
        },
        "bit1": {
          "type": "integer",
          "format": "int32"
        },
        "bit0": {
          "type": "integer",
          "format": "int32"
        },
        "random": {
          "type": "boolean"
        }
      }
    },
    "modbusCoilCtrlReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "random": {
          "type": "boolean"
        }
      }
    },
    "modbusCoilCtrlResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusBitGroupRegister"
        }
      }
    },
    "modbusDiscreteInputCtrlReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "random": {
          "type": "boolean"
        }
      }
    },
    "modbusDiscreteInputCtrlResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusBitGroupRegister"
        }
      }
    },
    "modbusGetCoilResp": {
      "type": "object",
      "properties": {
        "list": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/modbusBitGroupRegister"
          }
        },
        "index": {
          "type": "integer",
          "format": "int32"
        },
        "size": {
          "type": "integer",
          "format": "int32"
        },
        "total": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "modbusGetDiscreteInputResp": {
      "type": "object",
      "properties": {
        "list": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/modbusBitGroupRegister"
          }
        },
        "index": {
          "type": "integer",
          "format": "int32"
        },
        "size": {
          "type": "integer",
          "format": "int32"
        },
        "total": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "modbusGetHoldingRegisterResp": {
      "type": "object",
      "properties": {
        "list": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/modbusWordRegister"
          }
        },
        "index": {
          "type": "integer",
          "format": "int32"
        },
        "size": {
          "type": "integer",
          "format": "int32"
        },
        "total": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "modbusGetInputRegisterResp": {
      "type": "object",
      "properties": {
        "list": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/modbusWordRegister"
          }
        },
        "index": {
          "type": "integer",
          "format": "int32"
        },
        "size": {
          "type": "integer",
          "format": "int32"
        },
        "total": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "modbusGetRTUAddrResp": {
      "type": "object",
      "properties": {
        "addrs": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "modbusGetTCPAddrResp": {
      "type": "object",
      "properties": {
        "addrs": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "modbusGetTTYAddrResp": {
      "type": "object",
      "properties": {
        "addrs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/modbusTTYAddr"
          }
        }
      }
    },
    "modbusHoldingRegisterCtrlReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "random": {
          "type": "boolean"
        }
      }
    },
    "modbusHoldingRegisterCtrlResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusWordRegister"
        }
      }
    },
    "modbusInputRegisterCtrlReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "random": {
          "type": "boolean"
        }
      }
    },
    "modbusInputRegisterCtrlResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusWordRegister"
        }
      }
    },
    "modbusSetCoilReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "field": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "modbusSetCoilResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusBitGroupRegister"
        }
      }
    },
    "modbusSetDiscreteInputReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "field": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "modbusSetDiscreteInputResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusBitGroupRegister"
        }
      }
    },
    "modbusSetHoldingRangeReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "min": {
          "type": "integer",
          "format": "int32"
        },
        "max": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "modbusSetHoldingRangeResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusWordRegister"
        }
      }
    },
    "modbusSetHoldingRegisterReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "field": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "modbusSetHoldingRegisterResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusWordRegister"
        }
      }
    },
    "modbusSetInputRangeReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "min": {
          "type": "integer",
          "format": "int32"
        },
        "max": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "modbusSetInputRangeResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusWordRegister"
        }
      }
    },
    "modbusSetInputRegisterReq": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "field": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "modbusSetInputRegisterResp": {
      "type": "object",
      "properties": {
        "info": {
          "$ref": "#/definitions/modbusWordRegister"
        }
      }
    },
    "modbusTTYAddr": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "baud": {
          "type": "integer",
          "format": "int32"
        },
        "databits": {
          "type": "integer",
          "format": "int32"
        },
        "stopbits": {
          "type": "integer",
          "format": "int32"
        },
        "parity": {
          "type": "string"
        },
        "timeout": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "modbusWordRegister": {
      "type": "object",
      "properties": {
        "addr": {
          "type": "string"
        },
        "hex": {
          "type": "string"
        },
        "ubint16": {
          "type": "integer",
          "format": "int64"
        },
        "ulint16": {
          "type": "integer",
          "format": "int64"
        },
        "sbint16": {
          "type": "integer",
          "format": "int32"
        },
        "slint16": {
          "type": "integer",
          "format": "int32"
        },
        "min": {
          "type": "integer",
          "format": "int32"
        },
        "max": {
          "type": "integer",
          "format": "int32"
        },
        "random": {
          "type": "boolean"
        }
      }
    },
    "protobufAny": {
      "type": "object",
      "properties": {
        "type_url": {
          "type": "string"
        },
        "value": {
          "type": "string",
          "format": "byte"
        }
      }
    },
    "runtimeError": {
      "type": "object",
      "properties": {
        "error": {
          "type": "string"
        },
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "details": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/protobufAny"
          }
        }
      }
    }
  }
}
`
)
