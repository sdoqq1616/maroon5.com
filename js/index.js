window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];

    // for (var i = 0; i < ul.children.length; i++) {
    //     var li = document.cloneNode('li');
    //     li.setAttribute('index', i);
    //     ol.appendChild(li);
    //     li.addEventListener('click', function () {
    //         for (var i = 0; i < ol.children.length; i++) {
    //             ol.children[i].className = '';
    //         }
    //         this.className = 'current';
    //         index = this.getAttribute('index');
    //     })
    //     ol.children[0].className = 'current';
    // }

    // //把ul第一个元素复制到最后去  最后一个元素复制到前头来 做无缝滚动
    // //第一步克隆两个元素后  安插进去
    // var li_first = ul.children[0];
    // var li_end = ul.children[ul.children.length - 1];
    // //把ul第一个元素安插到最后去  最后一个元素复制到前头来
    // ul.appendChild(li_first);
    // ul.insertBefore(li_end, ul.children[0]);

    var focusWidth = focus.offsetWidth;
    var index = 0;
    var flag = false;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * focusWidth;
        ul.style.transition = 'all .8s';
        ul.style.transform = 'translateX(' + translatex + 'px)';

    }, 2000);
    ul.addEventListener('transitionend', function () {
        if (index >= 6) {
            index = 0;
            ul.style.transition = 'none';
            var translatex = -index * focusWidth;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 5;
            ul.style.transition = 'none';
            var translatex = -index * focusWidth;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }

        //圆点变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
        console.log(index);

    });

    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })

    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * focusWidth + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();
    })

    ul.addEventListener('touchend', function (e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * focusWidth;
                ul.style.transition = 'all .8s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * focusWidth;
                ul.style.transition = 'all .8s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                var translatex = -index * focusWidth;
                ul.style.transition = 'all .8s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
        
            }, 2000);
        }

    });

    var local_nav = document.querySelector('.local-nav');
    var goBack = document.querySelector('.goBack');
    window.addEventListener('scroll', function (e) {
        if (this.window.pageYOffset >= local_nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });

    goBack.addEventListener('click', function () {
        animate(window, 0);
    });



    function animate(obj,target,callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            if (obj.pageYOffset == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            var step = (target - obj.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            window.scroll(0, obj.pageYOffset + step);
        }, 15)
    }

})