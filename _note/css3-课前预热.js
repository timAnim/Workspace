`
1. border-image 属性 有点像九妹图


2. 属性选择器
	[attr~='只要有就行']
	[attr^='开头有才行']
	[attr$='结尾有才行']


3. not伪类选择器
	li:not([attr='prop'])


4. transform: rotate(x, y, z)
  2D坐标轴固定的变换方式
		transform: rotateX(俯仰角)
		transform: rotateY(偏航角)
		transform: rotateZ(翻滚角)

	3D以xyz形成的矢量为轴 旋转angle°
		transform: rotate3D(→x, →y, →z, angle)

	transform: rotateX(x) rotateY(y)不等价, 后者的坐标系是固定的. 前者坐标轴变换了


5. transform: scale(abs)
	2D方式scale(x, y)

	3D方式scale3D(x, y, z)


6. skew(x, y)
	以x,y轴斜切 响应角度


7. translate(x, [y])
	平移绝对值, 或者平移相对自己的百分比


8. transform 实际是坐标轴变换 且变换有先后关系, 每次变化都是变化坐标轴


9. transform-origin 改变原点


10. transition: attr during timing delay[, another]
	timing 可以是 cube-beizer(a,b,c,d)


11. animation: name during timing delay times direction(normal, reverse alternate) play-state
	alternate 奇数次正向 偶数次反向
	forwards, backwards, both

	animation-play-state: paused|running 播放或暂停


12. columns: width count
	column-gap 默认 1个字的宽度

	column-ruler 骑缝线
 
	column-span 标题的跨度 1/all

13. 元素上的属性
	flex: grow shrink basis
		flex-grow 不够按比例放
		flex-shrink 过大了按比例缩
		flex-basis 占主轴的空间 可以覆盖width或者height
		align-self item沿垂直方向的对齐方式 strentch高度几成父级

	在父级上的属性flex-flow: direction wrap;
	  flex-direction column 或者row
		flex-wrap 默认超出不换行

	主轴(x)排序方式 justify-content
		flex-start
		flex-end
		center
		space-between
		space-around

	交叉轴(y)对齐方式 align-items
		flex-start
		flex-end
		center
		baseline
		strench

	多根轴的对齐方式 align-content
		flex-start
		flex-end
		center
		baseline
		strench

	align 是交叉轴上的 justify 是主轴上的


14. 网页100px 的尺寸在手机端 会变小(除以dpr)
	<meta name = "viewport" content = "width = device-width, initial-scale = 1.0">


15.	媒体查询: 解决不同设备用多份代码, 解决维护的问题. 为每种设备提供一种样式
	media type: screen all print...
	media query: 

	引用方式三种:
		1. link引用 <link media = "screen and (max-width|device|width: 800px)" href="s.css">
		2. @media screen and (max-width:800px){ ... } -> 可以减少请求
			 @media screen, print and (min-width: 600px){ ... }
			 @media not screen { ... }
			 @media only screen { ... } 不太用
		3. @import


16. 物理像素 != 设备独立像素
	a. 用双倍的图片避免图片模糊
	b. 小屏用大图, 有些色差, 但是能接受 


17. 重排, 重绘, 性能
	a. 取值有时引起重排 offsetTop, clientHeight, scrollHeight
	b. 重排或重绘放在一起时, 浏览器会同时执行
	c. 不要交叉重排重绘, 无法合并执行
	d. 读取dom 和写dom 放在一起操作
	e. 通过类名和css改变样式而不是js 或者一次操作style
	f. 制作动画时可以先使其脱离文档流


18. transform-style: flat | preserve-3d -> 所有子元素都是3D的元素
	.wrapper{
		transform-style: preserve-3d; // 子元素为3D
		perspective: 600px; // 透视, 可以设在父级, 或每个子元素上(每个图形都有自己的透视点)
		perspective-origin: 50% 50%;
	}
	.wrapper.child{
		transform: rotateX(45deg) perspective: 600px; // 每个子元素上(每个图形都有自己的透视点)
		backface-visibility: hidden; // 翻面不可见
	}


19. 旋转照片墙


20. 建议
	1. 使用translate3d 和 scale3d
	2. 通过backface 和 perspective 避免闪烁
	3. 用translate3d 来替代left
	4. 减少重排重绘
`