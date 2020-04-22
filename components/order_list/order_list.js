// components/order_list/order_list.js
const computedBehavior = require('miniprogram-computed')
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import {store} from '../../assets/js/store'
Component({
  behaviors: [computedBehavior,storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },
  storeBindings: {
    store,
    fields: {
      numA: () => store.numA,
      numB: (store) => store.numB,
      sum: 'sum'
    },
    actions: {
      buttonTap: 'update'
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    a: 1,
    b: 1,
  },
  computed: {
    sum(data) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      return data.a + data.b
    },
  },
  watch: {
    'a, b': function(a, b) {
      this.setData({
        sum: a + b
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      console.log(this.data.sum)
      this.setData({
        a: this.data.b,
        b: this.data.a + this.data.b,
      })
      // 立刻更新
      this.updateStoreBindings()
    },
    message1 (data){
      console.log(data)
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('acceptDataFromOpenedPage', {data: 'test...'});
      eventChannel.emit('someEvent', {data: 'test...1'});
      eventChannel.on('message',this.message1);
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
