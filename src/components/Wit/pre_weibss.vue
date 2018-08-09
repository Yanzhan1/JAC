<template>
  <div>
    <ul class="comment">
      <li style="color:yellow;font-size:.4rem">☆</li>
      <li>☆</li>
      <li>☆</li>
      <li>☆</li>
      <li>☆</li>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
$(function() {
  $(".comment>li").mouseover(function() {
    $(this).text("★").prevAll("li").text("★").end().nextAll("li").text("☆");
    })
    .mouseout(function() {
      $(".comment").find("li").text("☆");
      $(".comment>li[index=1]")
        .text("★")
        .prevAll("li")
        .text("★");
    })
    .click(function() {
      $(this)
        .attr("index", "1")
        .siblings("li")
        .removeAttr("index");
    });
});
</script>

<style scoped>
li{
  width:.2rem;
  height:.2rem
}
</style>
