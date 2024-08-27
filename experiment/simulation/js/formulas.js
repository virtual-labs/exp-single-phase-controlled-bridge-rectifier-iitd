const pie = 3.1428
const Formulas = {  
    
    one_minus_D(D){
        return 1 - D
    },
    r_load : {
        vm(values){
            let ans  = values.vIn * Math.sqrt(2)
            return Number(ans).toFixed(4)
        },
        vdc(values){
            let alpha = values.D
            let cos = Math.cos(alpha)
            let onePlusCos = 1 + cos
            let vmByPI = this.vm(values) / Math.PI
            let ans = vmByPI * onePlusCos
            return Number(ans).toFixed(4)
        },
        idc(values){
            let ans = (this.vdc(values)) / values.R
            return Number(ans).toFixed(4)
        },
        vrms(values){
            let val = (1 / 2) - (values.D / (2 * pie)) + (Math.sin(2 * values.D) / (4 * pie))
            let ans = this.vm(values) * (Math.sqrt(val)) 

            // console.log("val" , val, "vm", this.vm(values))
            return Number(ans).toFixed(4)
        },
        irms(values){
            let ans = (this.vrms(values)) / values.R
            return Number(ans).toFixed(4)
        },
        power(values){
            let ans = (Math.pow(this.irms(values), 2)) * values.R

            return Number(ans).toFixed(4)
        },
        s(values){
            let ans = values.vIn * (this.irms(values)) 
            return Number(ans).toFixed(4)
        },
        pf(values){
            let ans =  (this.power(values)) / (this.s(values)) 
            return Number(ans).toFixed(4)
        },
    },
    rl_load : {

        //vdc idc vrms irms power Is Is1 HF df  pf
        vm(values){
            let ans  = values.vIn * Math.sqrt(2)
            return Number(ans).toFixed(4)
        },
        vdc(values){
            let ans = (  2 * (this.vm(values)) / pie ) * ( Math.cos(values.D))
            return Number(ans).toFixed(4)
        },
        idc(values){
            let ans = (this.vdc(values)) / values.R
            return Number(ans).toFixed(4)
        },
        vrms(values){
            let ans = this.vm(values) / (Math.sqrt(2)) 
            return Number(ans).toFixed(4)
        },

        //* for irms --> In
        //In --> Vn and Zn
        //Vn --> An and Bn
        //Zn --> 

        

        an(values, idx){
            let left = (Math.cos(idx + 1) * values.D) / (idx + 1)
            let right = (Math.cos(idx - 1) * values.D) / (idx - 1)

            let ans = (2 * (this.vm(values)) / pie) * (left - right)
            return Number(ans).toFixed(4)
        },

        bn(values, idx){
            let left = (Math.sin(idx + 1) * values.D) / (idx + 1)
            let right = (Math.sin(idx - 1) * values.D) / (idx - 1)

            let ans = (2 * (this.vm(values)) / pie) * (left - right)
            return Number(ans).toFixed(4)
        },

        vn(values, idx){
            let val = Math.pow((this.an(values, idx)), 2) + Math.pow((this.bn(values, idx)), 2)

            let ans = Math.sqrt(val)
            return Number(ans).toFixed(4)

        },

        zn(values, idx){
            //! w f and l values is  given by mam
            const f = 50 ,w = 2 * pie * f

            let val = Math.pow(values.R, 2) + Math.pow((idx * w * values.L), 2)

            let ans = Math.sqrt(val)
            return Number(ans).toFixed(4)

        },

        in(values, idx){
            let ans = this.vn(values, idx) / this.zn(values, idx) 
            return Number(ans).toFixed(4)
        },

        irms(values){
            let right = 0
            for(let idx = 2; idx <= 6; idx += 2){
                right += Math.pow((this.in(values, idx) / Math.sqrt(2)), 2)
            }
            let left = Math.pow((this.idc(values)), 2) 
            
            let val = left + right
            let ans = Math.sqrt(val)
            return Number(ans).toFixed(4)
        },
        power(values){
            let ans = (Math.pow(this.irms(values), 2)) * values.R
            return Number(ans).toFixed(4)
        },
        is(values){
            let ans = this.idc(values)
            return Number(ans).toFixed(4)
        },
        is1(values){
            let ans =  ((2 * (Math.sqrt(2))) * this.idc(values) ) / pie  
            return Number(ans).toFixed(4)
        },
        hf(values){
            let ans =  0.483
            return Number(ans).toFixed(4)
        },
        df(values){
            let ans =  Math.cos(-(values.D))
            return Number(ans).toFixed(4)
        },
        pf(values){
            let ans =  ((2 * (Math.sqrt(2))) / pie )* Math.cos(values.D)
            return Number(ans).toFixed(4)
        },
    },
}
//* vIn is Vac , D is firing angle , R is resistance
// L is the L
let values = {
    vIn:0,
    D:0,
    dVal: 0,
    R:0,
    L:0,
}


//L  is 
function updateValues(vIn=0,D=0,R=0,L=0){
    values = {
        vIn:vIn,
        // convert alpha to radion
        D:D * (pie / 180),
        dVal: D,
        R:R,
        L:L,
    }
}