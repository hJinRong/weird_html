## data_1.html

经过测试，要想drag的效果看得见，被拖动元素节点标签内的``ondragstart="event.dataTransfer.setData('text/plain',null)"``这一句很有必要，否则，在视觉反馈上是不能拖动的。

> ### Known issue  
> 1. 有点奇怪的一点是，拖动元素到要放下的元素``destination``之上，但再拖出来还没有放下，仍然会触发``drop``事件，``destination元素``的背景被置为``“”``(空字符串),而不是意料中的被重置。