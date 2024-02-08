<template>
  <div>
    <h3></h3>
    <ol>
      <check-check :initData='children' ref='ckck'></check-check>
    </ol>
  </div>
</template>
<script>
import checkCheck from "@/components/_common/check-check.vue";
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
    "check-check": checkCheck
  }
};
</script>
