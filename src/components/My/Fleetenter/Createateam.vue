<template>
  	<div>
     <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">滑动触发列表项菜单</h1>
      </header>
      <div class="mui-content">
        <h5 class="mui-content-padded" style="margin: 35px 10px 15px 10px;">拖拽(滑动)显示功能按钮，点击按钮触发事件</h5>
        <ul id="OA_task_1" class="mui-table-view">
          <li class="mui-table-view-cell">
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-handle">
              左滑显示删除按钮
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-slider-left mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-handle">
              右滑显示删除按钮
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-slider-left mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-handle">
              左右滑动均可显示删除按钮
            </div>
          </li>
        </ul>
        <h5 class="mui-content-padded" style="margin: 15px 10px;">拖拽(滑动)显示操作图标，释放后还原，自动触发事件</h5>
        <ul id="OA_task_2" class="mui-table-view">
          <li class="mui-table-view-cell">
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-handle mui-table">
              <div class="mui-table-cell">
                左滑自动触发删除
              </div>

            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-slider-left mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-handle">
              右滑自动触发删除
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-slider-left mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-red">删除</a>
            </div>
            <div class="mui-slider-handle">
              左右滑动均可自动触发删除
            </div>
          </li>
        </ul>
        <h5 class="mui-content-padded" style="margin: 15px 10px;">拖拽(滑动)显示多功能菜单</h5>
        <ul id="OA_task_2" class="mui-table-view">
          <li class="mui-table-view-cell">
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-grey mui-icon mui-icon-person"></a>
              <a class="mui-btn mui-btn-yellow mui-icon mui-icon-phone"></a>
              <a class="mui-btn mui-btn-red mui-icon mui-icon-email"></a>
            </div>
            <div class="mui-slider-handle">
              <div class="mui-table-cell">
                左滑显示多功能菜单
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-slider-left mui-disabled">
              <a class="mui-btn mui-btn-red mui-icon mui-icon-email"></a>
              <a class="mui-btn mui-btn-yellow mui-icon mui-icon-phone"></a>
              <a class="mui-btn mui-btn-grey mui-icon mui-icon-person"></a>
            </div>
            <div class="mui-slider-handle">
              右滑显示多功能菜单
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-slider-left mui-disabled">
              <a class="mui-btn mui-btn-red mui-icon mui-icon-email"></a>
              <a class="mui-btn mui-btn-yellow mui-icon mui-icon-phone"></a>
              <a class="mui-btn mui-btn-grey mui-icon mui-icon-person"></a>
            </div>
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-grey mui-icon mui-icon-person"></a>
              <a class="mui-btn mui-btn-yellow mui-icon mui-icon-phone"></a>
              <a class="mui-btn mui-btn-red mui-icon mui-icon-email"></a>
            </div>
            <div class="mui-slider-handle">
              左右滑动均可显示多功能菜单
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted(){
  }
};
</script>

<style scoped>
</style>
