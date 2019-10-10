## tail_1.html

``tail_1.html``的重点是使用了``document.documentElement.scrollTop``和``document.body.scrollTop``两个api,可是在实验过程中,有一个很困难的东西就是要事先得知在要进行效果变化的节点在垂直高度的哪个范围哪个范围,另外这样测试出来的结果往往非常不够精准，颇有玄学味道。  

直到我看到了Vue.js官网的一个赞助商的列表效果，他可以根据scrollbar的高度来让赞助商图片列表从黑白变成彩色效果，经过一番查找，终于找到了一段关键代码可以进一步改进效果实现：

```javascript
<script>
(function () {
  var topScrolled = false
  var sponsors = document.getElementById('sponsors')
  var sponsorTop = sponsors.offsetTop
  var sponsorActive = false

  window.addEventListener('resize', function () {
    sponsorTop = sponsors.offsetTop
  })

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 165 && !topScrolled) {
      topScrolled = true
      document.getElementById('mobile-bar').classList.remove('top')
    } else if (window.pageYOffset <= 165 && topScrolled) {
      topScrolled = false
      document.getElementById('mobile-bar').classList.add('top')
    }
    if (window.pageYOffset > sponsorTop - 100) {
      if (!sponsorActive) {
        sponsorActive = true
        sponsors.classList.add('active')
      }
    } else {
      if (sponsorActive) {
        sponsorActive = false
        sponsors.classList.remove('active')
      }
    }
  })
})()
</script>
```

接下来将在``tail_2.html``内进行自实现。


---

## tail_2.html

这次实现的重点也是两个api，[Window.pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset)与[HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop),前者返回“返回文档在垂直方向已滚动的像素值”。后者``HTMLElement.offsetTop``是指“返回当前元素相对于其``offsetParent``元素的顶部内边距的距离。(意味获得的数值不一定是距离页面最顶的数值)或者body元素border顶部的距离”,在这个例子中则是获得元素本身到父ul的位置，然而然而父ul紧贴更上层的div，div紧贴更上层body元素，所以通过该api获得的数值和距离body应该是一样的。

那么问题又来了，如果通过``HTMLElement.offsetTop``获得的数值**不是**指“距离页面最顶部位置的数值怎么办”，那么将会出现网页只要滑动一小段距离就可以（而不需要滑动更长的距离）`window.pageYOffset > sponsorTop - 100`，我们的luckyitem就提前变化效果，这样的话我们看到的效果就是已经出现效果变化的luckyitem从底部冉冉升起，而不是这个元素在页面顶部的位置时元素本身再出现效果变化，譬如以下这种情况（``tail_3.html``）：

```
<body>

  <div id="Abox">
    ...
  </div>

  <div id="Bbox">
    <ul>
      ...
      <li id="luckyitem>I am a lucky item</li>
      ...
    </ul>
  </div>
</body>
```

但是经过实验，哪怕是这样，此时通过``HTMLElement.offsetTop``获得到的仍然是距离body的距离，真是玄学啊，难道不应该是获得距离Bbox顶部（或者ul）边缘的距离吗？其实只要更细致地考察``HTMLElement.offsetTop``的概念，就会发现其中出现[offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)一词，而``offsetParent``是有考究其本身是否为“定位元素”的区别的，所以父元素是否为“定位元素”，就会影响``HTMLElement.offsetTop``获得不同的效果。

假如我们给Bbox一个这样的修改让他变为定位元素：
```
<div id="Bbox" style="position:relative;">
    <ul>
      ...
      <li id="luckyitem>I am a lucky item</li>
      ...
    </ul>
  </div>
```
那么，才会出现luckyitem提前变化效果的情况出现。（如``tail_4.html``所示）

---

## tail_5.html

拓展地，通常我们可以在一些用户阅读文章到结尾的时候，在结尾处请求更多的新文章来让用户进行下一篇文章的阅读。这个例子模仿了新文本更新在页面结尾，造成一种“无底洞”的效果。