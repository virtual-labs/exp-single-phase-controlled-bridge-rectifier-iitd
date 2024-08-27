const sliders = {
    // slider_R_value: Number(document.querySelector(".slider_R").value),
    // slider_D_value: Number(document.querySelector(".slider_D").value),
    slider_V_value: 0,
    // d: document.querySelector(".d .slider_D"),
    v: document.querySelector(".v .value-box input"),
    r: document.querySelector(".r .slider_R"),
    v_knob: document.querySelector(".slider-V-arrow"),

    d: document.querySelector(".d .slider-d-slider"),
    d_input: document.querySelector(".d .value-box input"),
    d_max: 180,
    d_min: 0,
    d_step: 5,
    // sliderR(){
    //     let slider_R = document.querySelector(".slider_R")
    //     let sliderImg = document.querySelector(".slider-R-arrow")
    //     let sliderValueInput = document.querySelector(".r .value-box input")
    //     // ratio to move 450/50 = 1:10
    //     // max img 71px -> min 120 px
    //     let val = 0
        
    //     // slider function  
    //     function slide(e){
    //         e = e instanceof Event
    //         if(e){
    //             sliderValueInput.value = slider_R.value 
    //         }
    //         else{
    //             slider_R.value = sliderValueInput.value
    //         }
    //         val = (slider_R.value / 9.334)
    //         sliderImg.style.top = `${90 - val}px`
    //     }
    
    //     const slideInput = ()=>{
    //         let val = sliderValueInput.value
    //         if(val > 500){
    //             val = 500
    //         }
    //         sliderValueInput.value = val
    //         slide(false)
    //     }
    
    //     slider_R.oninput = slide
    //     sliderValueInput.onkeyup = slideInput
    //     sliderValueInput.addEventListener("focusout",()=>{
    //         if(sliderValueInput.value < 50){
    //             sliderValueInput.value = 50
    //         }
    //         slide(false)
    //     })
    // },
    sliderD(afterClickCallback=null){
        let slider_D = this.d
        let sliderImg = document.querySelector(".slider-D-arrow")
        let sliderValueInput = this.d_input
        let val = 0
        
        let maxRange = 75 // todo calculate by formula
        let minRange = 0 
        let stepSize = 5
        slider_D.value = minRange
        slider_D.min = minRange
        slider_D.max = maxRange
        slider_D.step= stepSize
        
        sliderValueInput.value = minRange
        const slide = (e)=>{
            e = e instanceof Event
            if(e){
                sliderValueInput.value = slider_D.value 
            }
            else{
                slider_D.value = sliderValueInput.value
            }
        }
        const slideInput = ()=>{
            let val = sliderValueInput.value
            if(val > this.d_max){
                val = this.d_max
            }
            sliderValueInput.value = val
            slide(false)
        }
    
        slider_D.oninput = (e)=>{
            slide(e)
            if(afterClickCallback)
                afterClickCallback()
        }
        sliderValueInput.onkeyup = slideInput
        sliderValueInput.addEventListener("focusout",()=>{
            if(sliderValueInput.value < minRange || sliderValueInput.value.length == 0){
                sliderValueInput.value = 0
            }
            slide(false)
        })
    },
    sliderV(afterClickCallback=null){
        let sliderArrow = document.querySelector(".slider-V-arrow")
        let sliderValueInput = document.querySelector(".v .value-box input")
        let minAngle = 75
        let maxAngle = 332
        let angleDifference = 7.5
        let angles = minAngle
        let minValue = 50
        let maxValue = 220
        let valueDifference = 1
        let value = minValue
        let singleClickDiff = 5
        let doubleClickDiff = 20

        function incrementAngleAndValue(isDoubleClick = false){
            if(isDoubleClick){
                angles = angles + angleDifference + (20 * 1.5)
                if(angles > maxAngle){
                    angles = minAngle
                }

                value = value + doubleClickDiff
                if(value > maxValue){
                    value = minValue
                }
            }else{
                angles = angles + angleDifference 
                if(angles > maxAngle){
                    angles = minAngle
                }

                value = value + singleClickDiff
                if(value > maxValue){
                    value = minValue
                }
            }

        }
        
        // slider function on single click 
        let rotateArrowSingleClick = (rot=0)=>{
            incrementAngleAndValue()
            sliderArrow.style.transform=`rotate(${angles}deg)`
            sliderValueInput.value = value
        }


        // * for input value
        const slideInput = ()=>{
            let val = Number(sliderValueInput.value)
            if(val > maxValue){
                val = maxValue
            }
            if(val >= 50){
                angles = val * 1.5
                sliderArrow.style.transform=`rotate(${angles}deg)`
                sliderValueInput.value = val
                value = val
                console.log("val:",val)
            }
        }

        sliderValueInput.onkeyup = slideInput
        sliderValueInput.addEventListener("focusout",()=>{
            if(sliderValueInput.value < minValue){
                sliderValueInput.value = minValue
            }
            slideInput()
        })
        
        sliderArrow.onclick = ()=>{
            rotateArrowSingleClick()
            // ! call back for arrow etc
            if(afterClickCallback)
                afterClickCallback()
        }
        // // $(sliderArrow).dblclick(rotateArrowDoubleClick)
        // let mouseDownInterval = null
        // $(sliderArrow).on({
        //     mouseenter: function () {
        //         mouseDownInterval = setInterval(() => {
        //             rotateArrowSingleClick()
        //         }, 30);
        //     },
        //     mouseout: function () {
        //         if(afterClickCallback)
        //             afterClickCallback()
        //         clearInterval(mouseDownInterval)
        //     },
        //     // mouseout: function(){
        //     //     clearInterval(mouseDownInterval)
        //     // }
        // });
    },
    init(){
        this.sliderV()
        // this.sliderR()
        this.sliderD()
        this.d_input.readonly = true
    },
    resetSlidersValue(){
        sliders.d.min = this.d_min
        sliders.d.max = this.d_max
        sliders.d.step = this.d_step
        sliders.d.value = this.d_min
        document.querySelector(".d .value-box input").value = sliders.d.value
        document.querySelector(".d .value-box input").readOnly = false

        // sliders.r.value = sliders.r.min
        // document.querySelector(".r .value-box input").value = sliders.r.value

        document.querySelector(".slider-V-arrow").style.transform=`rotate(${75}deg)`
        document.querySelector(".v .value-box input").value = 50
    },
    showAllSliders(){
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
        document.querySelector(".slider-circuit").style.display = "block"
    },
    showAll(){
        let sliderBox = document.querySelector(".universal-slider")
        sliderBox.style.display = "block"
    },
    showSlider(sliderName=""){
        if(sliderName != 'v'){
            return
        }
        this.showAll()
        document.querySelector(".slider-circuit").style.display = "none"
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "none"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "block"
    },
    hideSlider(sliderName=""){
        if(sliderName != 'v'){
            return
        }
        this.showAll()
        // document.querySelector(".slider-circuit").style.display = "none"
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "none"
    },
    showSliderFor(tableNumber){
        let imgSrc_1 = "./src/images/sliders/slider_circuit.png"
        let imgSrc_2 = "./src/images/sliders/slider_circuit_2.png"
        if(tableNumber == 1){
            $(".slider-circuit").attr('src',imgSrc_1)
        }else{
            $(".slider-circuit").attr('src',imgSrc_2)
        }
    },
    disable(sliderName){
        switch(sliderName){
            case "v":
                this.v_knob.style.pointerEvents = "none"
                this.v_knob.style.opacity = "0.7"
                this.v.disabled = true
                this.v.onclick = ()=>{}
                break
            
            case "d":
                this.d.disabled = true
                this.d_input.disabled = true
                this.d_input.classList.remove("btn-img")
                this.d.onclick = ()=>{}
                break
        }
    },
    active(sliderName){
        if(sliderName== 'v' || sliderName=="all"){
            this.v_knob.style.pointerEvents = ""
            this.v_knob.style.opacity = "1"
            this.v.disabled = false
        }
        if(sliderName == 'd' || sliderName=="all"){
            this.d.disabled = false
            this.d_input.disabled = false
            this.d_input.classList.add("btn-img")
        }
    }
}

sliders.init()



/*
use it like showSlider(sliderName)
like: d, v, r -> only those sliders are visible

and for all visible call
sliders.showAll()
*/