<template>
  <div>
    <h3></h3>
    <ol>
      <multi-level-drag :initData='children' ref='ckck'></multi-level-drag>
    </ol>
  </div>
</template>
<script>
import multiDrag from "@/components/_common/multi-level-drag.vue";
export default {
  data() {
    var arr = [
      {
        name: 1,
        next: [
          {
            name: "1-1",
            next: [
              {
                name: "1-1-1",
                next: [
                  {
                    name: "1-1-1-1",
                    check: true,
                    next: [
                      {
                        name: 1,
                        next: [
                          {
                            name: "1-1",
                            next: [
                              {
                                name: "1-1-1",
                                next: [
                                  {
                                    name: "1-1-1-1",
                                    check: true,
                                    next: [
                                      {
                                        name: 1,
                                        next: [
                                          {
                                            name: "1-1",
                                            next: [
                                              {
                                                name: "1-1-1",
                                                next: [
                                                  {
                                                    name: "1-1-1-1",
                                                    check: true,
                                                    sign: true,
                                                    next: []
                                                  },
                                                  {
                                                    name: "1-1-1-2",
                                                    check: false
                                                  }
                                                ]
                                              }
                                            ]
                                          },
                                          {
                                            name: "1-2"
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    name: "1-1-1-2",
                                    check: false
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            name: "1-2"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: "1-1-1-2",
                    check: false
                  }
                ]
              }
            ]
          },
          {
            name: "1-2"
          }
        ]
      },
      {
        name: 2,
        check: true
      },
      {
        name: 3,
        check: true,
        next: [
          {
            name: "3-1"
          },
          {
            name: "3-2"
          }
        ]
      }
    ];
    return {
      children: arr
    };
  },
  methods: {
    get() {
      console.log(this.$refs.ckck._list);
    }
  },
  components: {
    "multi-level-drag": multiDrag
  }
};
</script>
