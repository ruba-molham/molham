var canvas
var height
var width
var ctx
var particles = []
var speed = 0
var text
var textX
var textY
var textColor
var paddingX = 230
var sound
var size3 = 3,
    size4 = 4
var bool
var fps = 10
var velocity = 5
var velocity2 = 20
var density1 = 0.05
var mq = window.matchMedia("(max-width: 500px)");
var mq2 = window.matchMedia("(max-width: 700px)");
var mq3 = window.matchMedia("(max-width: 900px)");
var mq4 = window.matchMedia("max-width: 1000px");
var mq5 = window.matchMedia("(max-width: 1200px)");
var mq6 = window.matchMedia("(max-width: 1300px)");
var mq7 = window.matchMedia("(max-width: 1800px)");
var stop = false;
var dark;
var time = 90,
    baseTime = 90
var newlineSpeed = 1000
var intro = document.getElementById("intro")
var frameCount = 0;
var sound = document.getElementById("my_audio")
var paused = true
var fps, fpsInterval, startTime, now, then, elapsed;
var textsize = 20
var speedInc = 2.7
if (mq.matches) {
    paddingX = 1
    size3 = 2
    size4 = 3
    textsize = 13
    fps = 3
    velocity = 1.5
    velocity2 = 1.5
    density1 = 0.07
    speedInc = 9
    newlineSpeed = 700
    time = 60
    baseTime = 60
} else if (mq2.matches) {
    paddingX = 10
    textsize = 15
    fps = 3
    newlineSpeed = 700
    velocity = 1.5
    velocity2 = 1.5
    density1 = 0.07
    speedInc = 9
    time = 60
    baseTime = 60
} else if (mq3.matches) {
    paddingX = 22
} else if (mq4.matches) {
    paddingX = 30
} else if (mq5.matches) {
    paddingX = 90
} else if (mq6.matches) {
    paddingX = 150
} else if (mq7.matches) {
    paddingX = 170
} else {
    size3 = 4
    size4 = 5
}
var index = 0;
var txt =
    `لن ننسَ خطوات بدايتنا...
وكيف سرنا الدرب، ضحكة بضحكة 
زادُنا دموع الأمهات 
فرحين بما حملناه لهنَّ من آمال 
تؤنسنا بسمة فيها ما لا يُقال 
تدفعنا الجراح إذ تَشفى 
تبهجنا الخيام إذ تُطوى 
يدًا بيد لنحقق أحلام من رحلوا `

var cursor = "<span class='cursor cursorAnimation'>|</span>"

function typeWriter() {
    var i = 0
    if (index < txt.length - 1) {
        intro.innerHTML += txt.charAt(index);
        index++;
        if (txt.charAt(index) == '\n') {
            setTimeout(typeWriter, 700);
            i = 0
            time = baseTime
            setTimeout(function() {
                intro.innerHTML = intro.innerHTML.replace(/(<span class="cursor cursorAnimation">[|]<\/span>)/ig, "");

            }, newlineSpeed)

        } else {
            if (index != txt.length - 1) {
                setTimeout(function() {
                    intro.innerHTML = intro.innerHTML.replace(/(<span class="cursor cursorAnimation">[|]<\/span>)/ig, "");

                }, time)

            }

            setTimeout(typeWriter, time);
            i -= 2
            time += i;

        }
        intro.innerHTML += cursor;

    }
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min - 1) + min)
}

var mouse = {
    x: undefined,
    y: undefined,
    radius: 100
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y

})
window.addEventListener('mouseover', function(event) {
    mouse.x = event.x
    mouse.y = event.y
    bool = true

})

window.addEventListener("mouseout", function() {
    bool = false;
});

window.addEventListener("touchstart", function(e) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    bool = true;
    //setInterval(function(){bool=false;},1000);

});
window.addEventListener("touchend", function() {
    bool = false;
});
window.addEventListener("touchmove", function(e) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

function drawImage(png) {
    ctx.drawImage(png, 0, 0)
    let imageWidth = png.width;
    let imageHeight = png.height;

    const data = ctx.getImageData(0, 0, imageWidth, imageHeight)

    ctx.clearRect(0, 0, width, height);
    class Sand {
        constructor(x, y, radius, color, baseX, baseY) {
            this.x = x
            this.y = y
            this.baseX = baseX + (width - png.width * size4) - paddingX * 1.5;
            this.baseY = baseY + (height - png.height * size4) / 2;
            this.baseRadius = radius
            this.startRadius = Math.random() * 1.5
            this.speed = 0
            this.baseColor = color
            this.xMulham = random(-width, width * 2);
            this.yMulham = random(-height, height * 2)
            this.density = Math.random()

        }
        draw() {

            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
            ctx.fillStyle = this.color
            ctx.fill()


        }
        update() {




            if (this.speed < 820) {
                this.color = `hsl(${random(200,280)},${random(40,50)}%,${random(0,35)}%)`
                this.radius = this.startRadius
            }
            if (this.speed > 820 && this.speed < 910) {

                if (this.speed > 825) {
                    this.color = this.baseColor
                    this.radius = this.baseRadius
                }
                if (this.x !== this.baseX) {

                    let dx = this.x - this.baseX;
                    this.x -= dx / velocity
                }
                if (this.y !== this.baseY) {

                    let dy = this.y - this.baseY;
                    this.y -= dy / velocity
                }


            } else
            if (this.speed > 900 && this.speed < 1020) {
                this.baseX = this.base2X
                this.baseY = this.base2Y
                this.color = this.whiteColor
                if (this.x !== this.baseX) {

                    let dx = this.x - this.baseX;
                    this.x -= dx / velocity
                }
                if (this.y !== this.baseY) {

                    let dy = this.y - this.baseY;
                    this.y -= dy / velocity
                }
            } else if (this.speed > 1020 && this.speed < 1180) {
                this.baseX = this.base3X
                this.baseY = this.base3Y
                this.color = this.redColor



                if (this.x !== this.baseX) {

                    let dx = this.x - this.baseX;
                    this.x -= dx / velocity
                }
                if (this.y !== this.baseY) {

                    let dy = this.y - this.baseY;
                    this.y -= dy / velocity
                }
            } else if (this.speed > 1180 && this.speed < 1320) {
                this.baseX = this.base5X
                this.baseY = this.base5Y
                this.color = this.sadColor

                if (this.x !== this.baseX) {

                    let dx = this.x - this.baseX;
                    this.x -= dx / velocity
                }
                if (this.y !== this.baseY) {

                    let dy = this.y - this.baseY;
                    this.y -= dy / velocity
                }

            } else if (this.speed > 1320 && this.speed < 1450) {
                this.baseX = this.base6X
                this.baseY = this.base6Y
                this.color = this.mulhamColor
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / velocity
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / velocity
                }


            } else if (this.speed > 1450 && this.speed < 1500) {
                this.color = this.mulhamColor
                this.baseX = this.xMulham
                this.baseY = this.yMulham
                if (this.x !== this.baseX) {

                    let dx = this.x - this.baseX;
                    this.x -= dx / velocity2
                }
                if (this.y !== this.baseY) {

                    let dy = this.y - this.baseY;
                    this.y -= dy / velocity2
                }
            } else if (this.speed > 1500) {
                this.radius = 1

                this.baseX = this.base4X
                this.baseY = this.base4Y
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy)
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                const maxDistance = 100;
                let force = (maxDistance - distance) / maxDistance
                if (force < 0) {
                    force = 0
                }
                let directionX = (forceDirectionX * force * this.density * density1);
                let directionY = (forceDirectionY * force * this.density * density1);
                if (distance < mouse.radius + this.radius && bool) {
                    //ctx.fillStyle = `rgba(${random(0,255)},${random(0,255)},${random(0,255)},${Math.random()})`
                    this.radius = 1.3
                    this.x -= directionX * 200
                    this.y -= directionY * 150
                } else {
                    if (this.x !== this.baseX) {

                        let dx = this.x - this.baseX;
                        this.x -= dx / velocity
                    }
                    if (this.y !== this.baseY) {

                        let dy = this.y - this.baseY;
                        this.y -= dy / velocity
                    }


                }
            }
            this.draw()
            this.speed += speedInc
            speed = this.speed


        }
        setBase2XY(base2X, base2Y, color) {
            this.base2X = base2X + paddingX * 2.5;
            this.base2Y = base2Y + (height - png.height * size4) / 2 + 20;
            this.whiteColor = color
        }
        setBase3XY(base3X, base3Y, color) {
            this.base3X = base3X + paddingX * 2.5
            this.base3Y = base3Y + (height - png.height * size4) / 2 + 20;
            this.redColor = color
        }
        setBase4XY(base4X, base4Y, color) {
            this.mulhamColor = color
            this.base4X = base4X + (width - png.width * size4) / 2;
            this.base4Y = base4Y + (height - png.height * size4) / 2;


        }
        setBase5XY(base5X, base5Y, color) {
            this.sadColor = color
            this.base5X = base5X + (width - png.width * size3) - paddingX * 2;
            this.base5Y = base5Y + (height - png.height * size4) / 2 + 20;

        }
        setBase6XY(base6X, base6Y) {
            this.base6X = base6X + (width - png.width * size4) / 2;
            this.base6Y = base6Y + (height - png.height * size4) / 2;


        }
    }


    function init(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
        /*
                for (let i = 0; i < 2000; i++) {
                    //let x = random(0, width)
                    //let y = random(-height, 0)
                    //let dx = random(-6, 6)
                    //let dy = random(4, 10)
                    let x = random(0, width)
                    let y = random(height - 100, height)
                    let dx = random(-20, 20)
                    let dy = Math.random() * 2
                    let radius = random(1, 4)
                    let maxHeight = random(height - 100, height - 150)
                    let color = randomColor(colorArray)
                        //sand.push(new Sand(x, y, dx, dy, radius, maxHeight, color))
                }
        */
        if (png == tent) {
            particles = []
            sand = []
            for (let i = 0; i < data.height; i++) {
                for (let j = 0; j < data.width; j++) {
                    if (data.data[(j * 4 * data.width) + (i * 4) + 3] > 120) {
                        let positionX = i;
                        let positionY = j
                        let x = random(-width, width * 2)
                        let y = random(-height, height * 2)
                        let radius = random(1, 4)
                        let color = `hsl(41, 66%, ${random(10,30)}%)`
                        particles.push(new Sand(x, y, radius, color, positionX * size4, positionY * size4))
                    }
                }
            }

        }

        if (png == sadgirl) {
            var positionX = []
            var positionY = []
            var color = []
            for (let i = 0; i < data.height; i++) {
                for (let j = 0; j < data.width; j++) {
                    if (data.data[(j * 4 * data.width) + (i * 4) + 3] > 120) {
                        positionX.push(i);
                        positionY.push(j);
                        color.push(`hsl(${random(0,360)}, 0%, ${random(80,100)}%)`)

                    }
                }
            }
            for (i = 0; i < particles.length; i++) {
                particles[i].setBase2XY(positionX[i] * size3, positionY[i] * size3, color[i])
            }

        }
        if (png == sadboy) {
            var positionX = []
            var positionY = []
            var color = []
            for (let i = 0; i < data.height; i++) {
                for (let j = 0; j < data.width; j++) {
                    if (data.data[(j * 4 * data.width) + (i * 4) + 3] > 120) {
                        positionX.push(i);
                        positionY.push(j);
                        color.push(`hsl(${random(355,360)}, 100%, ${random(10,30)}%)`)
                    }
                }
            }
            for (i = 0; i < particles.length; i++) {
                particles[i].setBase3XY(positionX[i] * size3, positionY[i] * size3, color[i])
            }

        }
        if (png == family) {
            var positionX = []
            var positionY = []
            for (let i = 0; i < data.height; i++) {
                for (let j = 0; j < data.width; j++) {
                    if (data.data[(j * 4 * data.width) + (i * 4) + 3] > 120) {
                        positionX.push(i);
                        positionY.push(j);


                    }
                }
            }
            for (i = 0; i < particles.length; i++) {
                particles[i].setBase6XY(positionX[i] * size4, positionY[i] * size4)
            }

        }
        if (png == sadboy2) {
            var positionX = []
            var positionY = []
            var color = []
            for (let i = 0; i < data.height; i++) {
                for (let j = 0; j < data.width; j++) {
                    if (data.data[(j * 4 * data.width) + (i * 4) + 3] > 120) {
                        positionX.push(i);
                        positionY.push(j);
                        color.push(`hsl(${random(340,345)}, 100%, ${random(5,20)}%)`)


                    }
                }
            }
            for (i = 0; i < particles.length; i++) {
                particles[i].setBase5XY(positionX[i] * size3, positionY[i] * size3, color[i])
            }

        }

        if (png == mulham) {
            var positionX = []
            var positionY = []
            var color = []
            for (let i = 0; i < data.height; i++) {
                for (let j = 0; j < data.width; j++) {
                    if (data.data[(j * 4 * data.width) + (i * 4) + 3] > 120) {
                        positionX.push(i);
                        positionY.push(j);
                        color.push(`rgb(${data.data[(j*4*data.width)+(i*4)]},${data.data[(j*4*data.width)+(i*4)+1]},${data.data[(j*4*data.width)+(i*4)+2]})`)

                    }
                }
            }
            for (i = 0; i < particles.length; i++) {
                particles[i].setBase4XY(positionX[i] * size4, positionY[i] * size4, color[i])
            }
        }






    }



    function animate() {
        if (stop) {
            return;
        }


        requestAnimationFrame(animate);



        now = Date.now();
        elapsed = now - then;



        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            then = now - (elapsed % fpsInterval);
            ctx.fillStyle = 'rgba(0,0,0,0.4)'
            ctx.fillRect(0, 0, width, height)
            particles.forEach(particle => {
                particle.update()
            });
            if (speed > 820 && speed < 840) {
                intro.style.display = "none";
            }
            if (speed == 837 && (sound.currentTime < 27.5 || sound.currentTime > 32.5)) {
                sound.currentTime = 29.8
            }
            if (speed > 840 && speed < 920) {

                text = "...لون الحزن"
                textX = ctx.measureText(text).width * 1.5 + paddingX * 1.5
                textY = (height) / 2 - 30
                var text2 = "...جوا الخيم"
                ctx.font = `700 ${textsize}px Tajawal`;
                ctx.fillStyle = `hsl(41, 66%, 30%)`
                ctx.fillText(text2, textX - 90, textY + 40);
                ctx.fillStyle = textColor
            } else if (speed > 900 && speed < 1020) {
                text = "...ضيَّع ملامحنا"
                textX = width - ctx.measureText(text).width * 1.5 - paddingX * 2.5
                textY = height / 2 - 30
            } else if (speed > 1020 && speed < 1190) {
                text = "...صوت الألم لمّا نزف"
                var text2 = "...قلَّب مواجعنا"
                ctx.fillStyle = 'hsl(360,100%,20%)'
                ctx.font = `700 ${textsize}px Tajawal`;
                ctx.fillText(text2, textX - 60, textY + 40);
                ctx.fillStyle = textColor
                textX = width - ctx.measureText(text).width * 1.2 - paddingX * 2
                textY = height / 2 - 30
            } else if (speed > 1190 && speed < 1320) {
                text = "...يُتم وقهر"
                textX = ctx.measureText(text).width * 1.7 + paddingX * 2.5
                textY = height / 2 - 30
                var text2 = "...درب العمر"
                ctx.font = `700 ${textsize}px Tajawal`;
                ctx.fillStyle = 'hsl(340,100%,20%)'
                ctx.fillText(text2, textX - 90, textY + 40);
                ctx.fillStyle = textColor
            } else if (speed > 1320 && speed < 1450) {
                text = "...صرنا الأهل نحنا"
                textX = width - ctx.measureText(text).width * 1.5 - paddingX * 2
                textY = (height - family.height * size4) / 2
                var text2 = "صرنا الأهل نحنا"
                ctx.fillText(text2, 10 + paddingX * 2, textY + 100);
                ctx.fillStyle = textColor
            } else if (speed > 1450 && speed < 1600) {
                text = ""
            } else if (speed > 1600) {
                text = "الخير يُنبت خيرًا، ويُلهم جيلًا، 8 سنوات ومستمرون"
                textX = (width - ctx.measureText(text).width) / 2
                textY = height - 75
            }
            ctx.font = `700 ${textsize}px Tajawal`;
            ctx.fillStyle = textColor
            textColor = 'white'
            ctx.fillText(text, textX, textY);


        }



    }
    window.addEventListener('resize', function() {


        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight;
        velocity = 5
        velocity2 = 20
        density1 = 0.05
        paddingX = 230
        fps = 10
        sound.currentTime = 0
        textsize = 20
        sound.play()
        intro.innerHTML = ""
        index = 0
        time = 90
        baseTime = 90
        speedInc = 2.7
        size3 = 3
        size4 = 4
        newlineSpeed = 1000
        text = ""
        if (mq.matches) {
            paddingX = 1
            size3 = 2
            size4 = 3
            textsize = 13
            fps = 3
            velocity = 1.5
            velocity2 = 1.5
            density1 = 0.07
            speedInc = 9
            newlineSpeed = 700
            time = 60
            baseTime = 60
        } else if (mq2.matches) {
            paddingX = 10
            textsize = 15
            fps = 3
            newlineSpeed = 700
            velocity = 1.5
            velocity2 = 1.5
            density1 = 0.07
            speedInc = 9
            time = 60
            baseTime = 60
        } else if (mq3.matches) {
            paddingX = 22
        } else if (mq4.matches) {
            paddingX = 30
        } else if (mq5.matches) {
            paddingX = 90
        } else if (mq6.matches) {
            paddingX = 150
        } else if (mq7.matches) {
            paddingX = 170
        } else {
            size3 = 4
            size4 = 5
        }
        if (intro.style.display == "none") {
            intro.style.display = "block"
            typeWriter()
        }
        init(fps)
        animate()



    })


    init(fps)


}


function start_Audio() {
    if (!mq.matches || !mq2.matches) {
        setTimeout(typeWriter, 1000);
    } else {
        typeWriter()
    }
    sound = document.getElementById("my_audio")
    var paragraph = document.querySelector(".music")
    var button = document.querySelector(".btn")
    var title = document.getElementById("text")
    var social = document.querySelector(".social-media")

    sound.play()
    paused = false
    paragraph.style.display = "none";
    //social.style.display = "block";
    button.style.display = "none";
    title.style.display = "block";
    social.style.display = "block";
    canvas = document.getElementById('canv')
    height = canvas.height = window.innerHeight;
    width = canvas.width = window.innerWidth;
    ctx = canvas.getContext('2d')
    drawImage(tent);
    drawImage(sadgirl)
    drawImage(sadboy)
    drawImage(mulham)
    drawImage(sadboy2)
    drawImage(family)


}
const sadgirl = new Image();
const sadboy = new Image();
const tent = new Image();
const mulham = new Image();
const sadboy2 = new Image();
const family = new Image();
mulham.src = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5AoYAg8Zfmv0hAAAAAFvck5UAc+id5oAABlMSURBVHja7Z15eFTlvcc/7zkzyWQhIYnsoiCiooBWsXVpXSq4V0TrVvW6VKVu1eqt9nq7WFstblVcsCx6q+2ttdYdalFUVBRBsFKCgAtLAiQQQvZMZjnnvX/8ziRnTs4kk8VM4Lnf55knmZmzve/3/Pbfe0axG2DT+KsBJgEDgMWATrGpOaylRj045szCPCvyKrB9e3bhRdM3LzpMo34IDAFagFeA5wBrVOncTA8veQCZvoDOMHPybPZvqiTPili2MqZppSYBq4GoZ9PjgVuaAjlnjQrvzN+UO7hQo8rPq/gox9T6amA+MA9YDpwJNAObH97xSaaHmIRApi8gHby113jVGMgpKYw3v//dnWuOM7R9J/BroMHZ5JvADcA8DTUD4uEbj6v+7KEs28rJsuM3A3dVZg9cXZ5TwoSGckJW9GVgPPBupsfmhZHpC0gHLWbWvgFtXdFoZp+6cNDE9wyt64FbaJPw84G/AAsRCVhfFGselWtFLgeerA/krF5WtP+YbaGiKQsHTcxXsK+B3rh2wAhmTp7NzMmzMz3EVuwWhAAxwAal6oK5u4ZFau4D9gZOAQqBvYBlQC5QDJRomAjs2HfLkoVvDRqfD/wQODZoWxcE7fjaD4oOXL8+b9gJzj79BrsFISE7tlWjHjugadvi87ctHb41VDwSeAI4HRgFhIF64GzgNuBzYB/g2TWjJmtDawtoAvJihrljSfGBy3dkF1ysRKqOyvT43NgtbMgpO1ZhanuQrdQPNGo7cCmwDtgOHIEY6IT39CZwCELUmsGROibVbgi/VzLusSGRulHDW3Z9nmXH2RYqelvJ+NdnenxuqL48mZ+uvmnR9E73c9zeW4AK4FmgCPgRMA74MzAF+AVCCsBPgA0IQQAjFFwMeqxG2cCb++4sffGpgy60GwOhtK+jL5AJlaVw3QhdMKqrgfEKvd/KgfvV7Fs6dwYy6fsgLnC+s10QGOxsD7Af8BsNTRr1e+CPwFmb9xp/zkk7Szltx6cZmILUyAQhBcCdwGRccVAapLyt0PPrAznDtoSKz/n9lHmHGNp+GjgIsR/7OtvlAXFgB5CFSNJrwOPAWmApMBeJW1SWHe830gGZIaQQuAJ4EXgEuYOBTkmx1uWPWPrGoEMbgIcD2rpxS05JGVCloNRQqFrLRkE2Ep80ItF9E6K6zkSkCefvLlJH/BlDJgjJQyZtAHAd8DLwvcSXfqSMKp3LqNK5rMsfTkBbG4G7QD3dGG6yIrb+oCwar1rdHLXLIrEDtsXihgGLN0fiAEcC/wRsYCdwPfAb4NuI7el3yISXlYOokgQmAE8DvwUeA6IzJ89OqUYsM9gwoLFq3piPnzOjIydM224Yl+UY6vD8oDnAgpaIrdeta4k9m6UoV7BTQ6mz60dAOZLP2gjUZGDsnSITXtY3Ede0wPN1FLgPISYC/p7P62Muw9IU5hrqzoEBY3qBaeQEVNswbA1Ntm3XWvabLbb+uYIVHze1cOleBcR1ew3V35KLmZAQG3/dnQX8DDHIdwPxVJKiFBMKAsY1xQEzx/udoaDANIxsQ52yM2YNr7Xsqw7PzV5e2hzh1K+ezsBwu4ZM2JAIMul+CAC3A5cnPvCzKbbWu7SmMdUJNJClFIOC5oRC0/hDTDO231nvFMgEIY1IZJ0KOYhbnDKlEdfsjGldrVvfa6LOy3I+VEBAKQJKDUcciN0CmSCkns4N6ggk8i6A9lIS07ohpnVFo2VTFbOoillUO6/tsThVMYuwrWm0bBose/aZG57uX0WPDpAJQhqALWlsdzJwrt8X1XErHLZ1eY1lk2sqBgcDDM2S1+CgSa6pqBOyVrTY+g//GHNZBobZPWTCqEeBNUimtrNruwqJU2rcBn5MKIit2RQAGiwNpk2eknsroBRBpQjbVrhF6/sDigoNnNYFg97dnFtvIFPZ3o8Rw97Z+SchKY6X3R/aGjRsyjUNcpSiOm4RMTRFARMDaLY1dXH7pbCtX8kxVKe+fQcZgsSufeYTZIqQlcBW2vJPqZCFRPGvJCbltK+e5vUxl2FDeczWLUVBIzQkGKAqblEbtyk0DXbFrS1hW9+fa6hIYh8vUpCQh6RVxiEBaw5wL30YRPYpITctmp6YiM3Ae0hdozMchWRvt7s/tLWuiGldb0NIKSgOGFTHLVriNo22PaskaHxaG7fbHcyHiDzgMMRmHYckK/dy5uZdnCC1r5ApCbGAvwHnAaFOth0JjMFDCLCzRevqqpg1OK41CohJlP6hhnk1cRtFm3T4EDEIkb6LkOxBgc+5P6JjF73XkckS7mLS6/rIRwhJmlQb6i3NtpChGBw0GRQ0MRVNNtynJAOciow84DJgAZKGn4w/GS1pXl+vos8JcXkrjcCjzt+OoJC4JAlTN7zdApQFW70qTZNtPxe19T/c23nIOBR4BiHiyE7Gvw5Y0dfz02OV5ZRXu4RX2v5diEzQdZ3sMtD7wcL9T8LSemNMa+JasStub4jaPJhtqBiIdLjIUMD3gd/hSFsaeBWogr4t73aLkA5ISNQ58p3/NSL6Dc4rDjC1cgUfDxzDtlBR3JmkbwBHd3DKoPcDx/XdGNNa11iWbrbtmVkGnyVSJy4yDKRqeDc+xKbAVsTG9Tm6TIiHDBPp7jgSMYwHA8ORqmCi5tGCVOc2Iu7ue8CqI2u/ajS1zQvDvrVFoW9GCkZjU5w25n6TcH2BsgbLtuKaxXGtn0mEDZ+PPsa9+TVIWj+vC8N8Fgle+7y8212VFUSa1C5Cqm8j6LhPeBRwOJIKqUcCwz9ZynhlauWK2jcGTVzeYganA7PxJ6XW76AK1odtPRv4q6lULbQj4yxEMrpCxnrnOoDuqWTofp2lu4SYwGnAD7qxbwFwEnACcJlCz5hWufzNxSUHv1MRKroUeJj2md6KFMfaruFGA3xKT4xF1GFxF64tAswAvjyibiN7h6vd32U5116IEBxAVHAzcpM1IA17QDKRXSGnyxVD14mKkCj2qu4cx4Ua4CHgoVUF+zZuyh20D3AHcIkz8DCS91p806LphF86VC7c0Cy45ChyB7fFbS7pCAKznGvrCmZp1E++s2tttCTaCBKrHIFogcOQzEIREjuZSLGtBagDtiEdk584ry9oawZPm5yeeFk1SPPaLuAmOg/wUqEIqX+MPrR+820hO1a2Pn/YjRq1wDnucGAT0EoGgLYVpz+zDICcaasAmNlGyPFIA3ZX8GrUCPxyXMPWaEm0cSxwITANSaN0NrbhznYnOe93ITZoEdJkUUqaAWaX4xAPw41I3eImxDPpLgykNeiRAxu3lXy7en1Mo14DzgEuRu4+Nw4GTk1xrCAiGQWkjwVhM+vaK8oW2+Mbyn+GuON3Id5fd260YuA7yJKJ12gjKq2J6DI8pMSAOYif/zqSFukuLgLuKY415p1TsQxEN/8LiA4e2po5KUD0/H3AMBDJcbm5E7owARbwxxYjeOUlW94f0RgIvYDYndE9GIMbNvBXJCuRFrqtshKkuGzKR86EXghciywH6I5tuQpYYStj7tTKFa3ncamry4EznGOfgayKcuNkJDnYGcqBByxlzLto64enxpX5EG2NdL2BKDATkZIm95x1hB6nTjwnqUNcxtMQUhaRfuo6gvTj/g5PDslFxn7ISikDIeQsknu8spGMbUeoQiT6zFHNVY+cW7HsbFupOfQuGTuRZo2f45CRLnol2+sjLRUIMX9GjN23EH08GtGv2Yi6aEDswxpkwc1K2md13biA5DjlUGThzgbn/WDnfF40IPHFQqSFddWYpu3W+IbyUzVqJlDSG/PgYCnwK6T3rN0cdYZeTb/7ENOEJOgSSboQUvQJ0uYyhklhdzyDKEK8HjcGIa5ogpACRAJ2OX83IR7Ov5BG610AOVaUCQ1laFQO4owU03NtUQY8iUhfZYoxdApfQuYPSx53KBAgalmcvu3FtA7qvghPpNtC2xqODvdLwKWuDqH93Z+NSEUCXyBN1VGEaN/i0slV/0YqKLwEfOjscwGSAhrYhfmLIbHHS8hqrLWdjaczdCQhCggqiNdHIvbhg4ewqdg/jTCqdC4Lhk2jtHon40sGMSI/n6JQCO3Ez6NK5/LG3t+nJR5POjhAXjCL75anlcc7hLY1IEnX6HofRZYhtMM1189qt6eRH6Pi5mO3I3f2s8jK3OOQTMEBiATmIUGgdo5fhzgEnyLe01I8mYSetKf6EuJM5CANDwJfZpvmPRHLimWbZgg4QCkVyQ0EvmyKxSytNfOHTUMD44pLAJ1vKFWQbZg1EdsKa63ZNP5qVu+sSpAwCrnT36Vr1biRPp/FnQnqMAnoDigRqZqEptRuCNa5Pm9GVvAuN7Ud0KhCW6m9EIkJISq2EVF7O+nAWHvzX10hqCMJsRERnhSz7cfygsF43LYfAM6LWVZLnWXNyQ0E77G03QLQEo+TZZqnWVrfVhVuHp1lmmtzAoG7gSWFWdmgFAaYlta3A5cquFDD/C74xX6rZesR3Z0uGQciaZnjkPJtnXuyHj/pCeLK4LjqtfGXhx1ZP33TouqokXKKEupyCJLfMhySqhDHpN5LUDrE+J5NKYWp1K6YbS8BrlBKnWbZ9iDgqrhtLylraBio0bdmm+abGt63tSbbNCdpqcQVNsVin9VHIyeETHM4cGZdNFKutcaCqUj5dCWwXAG2TrvDxq+yuB5J66dDxunA/UiUX48nAp85eXZrw/F7JeMuKI42Hvz88KPu0mCdXZlUODzAOdZkRNJLHHIUYlPqEZW2EvG0PnBISouYFCoLYtq2FTyp4SxTqXtbLEtnm2Z5xLJ+0hCN3KCUGtcci+VqHBWn1LlIGv76Hc3N/zO6oPABJBYZv6O5uVzBRA33ABEFd2rYoW045tHPCZM0ca25KQ82+Xz2Kq47sQMyLkBWayUcgDiuGounzPs9Z9uZgHVc9brE5yOQQtelpG5fykbs3HDE1b8KcemfQyL2zQliUpHi6+oFTQNDKd6t3LIUuMNQKlfDiKZYLLShrvZhpdQliHfyiaK1iyzH+beyvLEhPCArqxAIm0rVbG1qnKDFHRwL3L13/oC3DEMx5YmNIAYzSXOFXzq09eXCKpKDzHXOQDvDZCSl7/bGGnBqLB4yjkUWDRnA/IC2KY41KuC7SPzyczrvJXMjC4m/ZiBJxhvo5EEFvoScuvUFNHD80JE8UrnyyZxA4IdBw9ipYS+l1P7Aywpu0FBlA4ZSKOniaNJw59T99v+FgjOitlWxprr6dFOplxF7dJ9S6tEtjQ08t+0QnO7P8xEP514k5X4Q/pK7Filsgbiz9+NIjVeiXEQORwpUQz3H2owYZjfGIpKxD6Jm1h3csAVEtV2CVER7ggOQQDbY0UYpg6HvVbwECh4Ye6I+eujw10ylPs4LBKJ75w+4+Z3KsguAfwcMg0OKSyjKDvFI5SeLgLsLsrIOzA8G74rZ9sCtDY1jorb1C+ciblZK3YnWEYABI6YkTlWLZHVvQ5a2vYU0PkzxENOMLGluoS0L0BkuSzGRS4Cm0NmtRBYid/HhiJQvAKInnvVbkHjmdiQnVUn38BlSSv4xjleYCp06OS4X7mJnQt5RcJ2GLxNfaDAMGG1rfaWGWw2lItubm1dsb27aCaxQ8Fpc2+sCymDtkReSHZZrGjK0knPOf77AssxXkRqGGw0OMffQln4fgJSBXwOqwd/eOBIyGDGqEz1f70KM8rLZj12PUloBv0TSHQqJ3E8C1o9p2s74hnL3vkcgduEMJGXT0fxFHCL+hmiAze4vU9mQrqROXgSOQchYgDRAbwAGKDhMw/FKqb0VrNZwV02kZX7UsqJB07QVsPXgKVhmFtnhOgMxkBO3Vw6d+OCM25+/9Wf3zrUs81jP9QxAVs0ehBjTLx2S/tjRRbrU1WGImvDieWBlKK8ZpTRIdvgm1+Quc8bFmUt/CSTdlCuRNMxDSL3jaGB/JK1jItJUgaRrliAqtiodItImZFTp3MQFhYH/QtZ2XAX8J20qrwm5Gx5D7oayklAIXV/F59+6OHGoIkQKzkaM5z6AEQq1rAiOX/OitWriD/BfonCSc9z/wBOFp/DGEphA++LSJ8B9Sun4zHt/ilJ6KCIZRa5tFuHpcnHNAUh89rnzehIx0iFnLmKIao15zvu1JRfrkfT4/zoDHuwQtcG5wFqAV4dOQqNQozWIfj4XeTzSJJLT5c2GYUfemXVt+OhjP/i1c0y/iPwU5Pkld+A4dZ2QAU7xyoW1iJez4f6776CgsA6kQc/dD7YDubPboYP8XDMdZBx6JbmY6qCuCykjRYT8+uDDAFAybycA/w2ciH+bUBio/Wz1eI4+9oPliGGfRfIdm8CVwAuk396ZOJ8G3kBW+H4aOnsVBY/XgRj7azz7rAa+go5TMV/nUuouSUhHF+Lx50OI/r8dSdClQjVQZVmtXP0VEf37aN/POxhpO0oixNvVfvvN+3Pvw7eAOAKrkezBn4EapTQzJ89BKZ2F2I0hnnO8Tx93u3vxdTRbFyAxxQw6JgPEUFd7PvsLskzhH7RPn5+MaxI9ZCiAMWO/JBrNAvHQTkYaumsA5jx+XcKQn4hUG90II/FHRtErhLgmJg+xMTeSnvQtxXm6qMcmLEXSHRch9mo94r8PxfGcPGRMRmKYh4BvzHviR7SEQ9txxQ1zHr8OrRWI9E6nfSp/MxlqH3WjxxVDT1PzTxEXNZ0kbj3wjvuDnGmr3G5rI1L4eRVRV4n15t4nwE1GpCFhxM8KBOLXPPPUlW9B2+TOnNy6/THOPl58SopaSl+iN1XW2UjjXLrHXOZMQtIdmTNtlVdaLMS3X4kUhNyTlgvcSrJHtR8ipUOhnSSZSBrE70ECy+hZC1OvoEcS4hrsSKRhLt0nJsSBP9FBkaczt9a540uQwNGLSUhM85TnOg/Cv8GuESE84+gtCbkGiYzTxftI+gPo0mP+vAjjXydRiFryju8M2scnIOmSLyHzz17stoS4JvBA0ltNm0Ad4tbWdnDMVnQyQXVI3DDe57sSJKmZ8NQGIIT4YS2eFEem0BttQOfStRrBLCRQM5BY5RDEUH+BVP+2IWRpSCbJh5wY8HdEPXnT2itJdpvHg6cS1oZPSf2Eoj5FTwkpQsqy6eJFpI6RWEBehlToLkEKXLsQ97MUp+EAScnUQ8rF/i8gUff1tKmoMtoXr05A0jhexIF/9+ak9gTdWtfhmpgTEVuQzgqlt5H0x2bP5zlIPulyhJyBru9qEHXyFlJx+xT/SDrP2f9cpF4yC/k1hASykey0n0GvcsaxJtP2A3ouId8mPTL+iSTyNvt8F0bIeg/ph7oWkbo8RAKPcV4/RgLGZ5Eo3l3xa0IeA/sUIn3eCH9vRDX6YQupV2j1OXpCSBBxLztCDAnafo4ranbfiS5piyOZ1uVIyuOnSM0hIcWFyB0+BbEPsxH74W5yCOOPcbTPWyXwFZ1U8foSPXF7i5DiTCqUISnzG0lBRuK957Moom7OQTLF3uZrE7EZs5Fq3He8J/Y55kSS0/5urKMfBIQJ9ISQQfgnD5uQ/NNURI203rUd6WifSaxGIu7z8K9RBJA6yd+RYllrN4fH+BukVlcacRr6DXpi1I9HVkwlngzagNiC2YgRbv1Jou4YS8+kDkOaDK7AX83GEftxB+2zxwOQZQh+DyZoRNTgB/3BoEPPJCTRPrkRIWEqsnrqdXpIhs9+FUj94lf4p1sCSLbgUdqv9RhI+zagBGroRwY9MZDu4ivgakSdbMLz1LXeuONcz9cCUX0zkEmcgf+izosQwm6izT0uxj/+ALFPu3p8ob2InhCyxnklobdFvy19PhvEpX3C+Xs//snMK5DI/wHnfQltatWLrXT+NKI+Ra+soOoL/euRljkIGXfT3nsyESO/BFmIOpDUHlY5/SRlkkC3CMmUAXSRopG2z5FIwOjFEKROciFSGUz1HJZy+hl2ix8Fc8N1M0SRB/e/lWLTU5F1IKl6aTU9e9jB14LdjhAPqpA2UL+e23xEQlLZjwhO0NlfXF7YTQnxTOCHiKH3wwmIWvNbFRSmfQd8xrFbEgLtSJmHU5/3YCTSDWn7fNdIP8phJbDbEgJJpGxDSPFKQghJLPpJSD39zOWF3ZwQD17Gs04cSQ0Nx9/LqiN1djhj2O0JcUnJVqSHy4ss/HN2dbT/CfCMY7cnxIMFtH+Km8ZfZdXRz4JC2PMIKaW92mrGPyFZj7+xzyj2CEJcaqsWqTi6UYf/E4Ya6IfYIwjxwPvzRrVIi5EX/c7Dgj2TkC9Inuwa/GOUjK4DSYU9hhCX2qogOeCrQpoivOv+wp79+gX2GEJcqCeZkHJkJZW3tNunP9SSLvZEQiIkq6wvkH4wrx3pdzEI7JmExGm7+8OIG9xC8tpETT9q/XFjTyTEjQra2nyWkBwI/j8hfQSTtqLUatq6Sj4hvR+0zCj2REKyaOs3fo8272oLyUFjn/50ebrYEwnJR9p+ahFCEogjDXMaIaNfjr1fXlQPUYz0Ha9Enr/ixru0NTZk6icDO8QeQ4hnAWoOkopvhqTgbyNtD8bPzvQ1+2GPIcSFg5Bk4j99vrORte9xnCcFdXOx6deGPY0QhTzjcCFOIOiTGnkfSdN35fdF+gx7IiHzkSa6VL3G1cga+X6Z7e2Xhq0HsJG1KZ1hDp08jDJT+D+TROm8ChYZTQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMC0yNFQwMjoxNToxMyswMDowMNNPOjgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTAtMjRUMDI6MTU6MTMrMDA6MDCiEoKEAAAAAElFTkSuQmCC"
mulham.src = "data:image/png;base64,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"
sadgirl.src = " data:image/png;base64,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"
tent.src = "    data:image/png;base64,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"
sadboy.src = "   data:image/png;base64,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"
sadboy2.src = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAYAAABUfC3PAAAACXBIWXMAAAsSAAALEgHS3X78AAAFWElEQVR4nO1d7XHbMAwFevkfd4J4g7oTxBvUG8TZINnA2cCdoPYETSaoO0HtCWpP0GgC9NiDcnSjL0si8Wjr3elyuYtkWi8gwAcQZBGhAVi4Sp0PZp76v4vIxm40/SA5S2HmERHNiciR8aXiTw9EtCWiZ3eJyGvEYXZCMqSoRTzUEFGFNREtRGQfZ8TtAU8KM0+IaElEtz098klEFj09KwigSWHmsU5B1z0/euemP9Qp7QPAGKowC0CIwyf1NZBAt5StvsBQ+CwiW9tv+R6wlqJTV0hCHEaBn98KyNPXDGAMJhhIAQS6ow8NyDULMimhHfAL6kISmRToBV5IwJKiC7uXgB8Bq4Wh+5RQC7wM2RIvlZQVsjAJTYpOYeueH7tD91fwIbGIuNzJvb7MrlgjC5E5kkpyMfOKiO5a3g4v2edIMfPofMHNibfdi8gq0JB6RxKkMPNMZZe2Uv5XXb3nC9JXRHU4B7p071TcTSC1ONPobolGELqjXwaU76/VP80DPb81IC2FmedaJBE6n7LW6A4KMKRoUssRMQ+UAi7CQadHrCnMkWJ5EZEjw0VGYny5MYys34e7TC2FmRdqHbEsow5ugTqzlmBMSNFarlUEn9EGmRJjVv4aPfpS6/gFSgip1f5g5gerAUSzFHDrKINJdBbFUvS/Dtk6ynDn9DZdxMZDyChC66oQIquu12vM6Cw0KYszIMS/HDmTpENiNftVh+0LiDiIyDjkuIL6FJdMEhGn7D6F/JzICJ6TiRl9TVWVRVkotkGUaCzaOkUXY87sf8b6zJ7xGCs8tlrRPyfkZzLN60cTLK3yKXP9silgEVtBNiFFq0mWFp99KkQk+jgvveoeEqik9FHj1Qs0+RYVkKSIyARgGDkGUjwcYEYSGcikQG4SjQFLUsrCzNxC4Nt1hIIlKWVF1mhkRB8PIil5mSpCQiyzKKIwI6VmlYxSjG1SPGHt6IvWI7dASrJJ/xZrUtC3J1ykpcB2EnJWbFWUZ0qKfumQ27K74HKK8QqA2ohzIAUQZvobxFYIZkbcTrazEkYHUiogImzxuUOSqwJa/xwdKKTAJLU8ZFY6HAopiB0gFladKVB8ykxX9yjySvDS1CpAWIqIuF70I+3BYo0ny3CYELdsG0diEFu4h+jrGBAJNihStKmBJcz8iA80S7GumhxIKUDK2yR6w+BTADGQcgyIWjOokBhBmLQSIX2gWYp5qWr0PfMFQCOlr5x9ly185sXl50iKK6CbtpRsDhEOPqjFOcos7rSHmU5Df068F+I4KMToq+teyH/W1uIAg0eU7niIljIqmNebHrp5JLmrbPOtwX1QvSRTOhG1yUCPmkLr1rjfDe77iNRqPaXFY5OI6kjl1WK/ulRzhtb7PiVSal9cSYvBuroyuFR0SqS0dcJ1YfaNVdVKGc6elIYNOs36RRYhJVK6ZAXrQuNph2f3jmRI6biGqLOWU4/+CIrUpPu2mlbtFIYgROZIjZS2fqXJfTDO/iJIUSCWxhYiNVIqnX3NFFQXGsM4+6RIaRDeVk1By1Qav11Mjl6llCprGXxKB3TxDVWWNkRfHdBlEVllKTAnDaVISusXq1NYmaXBNOpJjhTNlxQ57KYSfBlxMKRcAYyhFqri5te0rLzVJbXKukToM2YVx9x+Z+adJ+VvvJ/7mN0nUI8UzF/+tIqEEmSeNeRdw9uepOojf+4m/xkqOYayvW6sL9+9vFNJsMTBJ6qvc7zMSPGsYZ7gCURVyIl6u06d+ipJKagsGXfYw+HfO7nAbQ//+6u9ToHvCHsjxSNg6jlVqDzDmeKgEtBzThBr3D8QgIEdEW3/Ah6yfmHXmU8SAAAAAElFTkSuQmCC"
family.src = "  data:image/png;base64,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"

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (!paused) {

            sound.pause()
        }

    } else {
        if (speed < 1700) {
            if (!paused) {
                sound.play()
            }




        }
    }
}, false);
