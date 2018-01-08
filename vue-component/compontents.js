var Main=Vue.component("Main",{
    template:`
        <div class="box">
            <div class="left">
                <router-view name="left"></router-view>
            </div>
            <div class="right">
                <router-view name="right"></router-view>
            </div>
        </div>`
})

var Left=Vue.component('left',{
    data() {
        return {
           menu:[]
        }
    },
    mounted(){
        fetch("./demo.txt").then(function(e){
            return e.json();
        }).then((e)=>{
            this.menu=e;
        })
    },
    computed:{
        parse(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    arr.push(this.menu[i]);
                }else{
                    for(var j in arr){
                        if(arr[j].id==this.menu[i].pid){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i]);
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i]);
                            }
                        }
                    }
                }
            }
            return this.menu=arr;
        }
    },
    template:`
     <ul>
        <li v-for="item in parse">
            <router-link :to="'#'+item.id">{{item.title}}</router-link>
            <ul>
                <li v-for="item1 in item.child">
                    <router-link :to="'#'+item1.id">{{item1.title}}</router-link>
                </li>
            </ul>
        </li>
     </ul>  
    `,
    watch:{
        /*$route(){
            var num = (this.$route.hash.slice(1));
            console.log(num);
            var pos = document.querySelector("#a"+num).offsetTop-70;
            console.log(pos);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()
            animate()
        }*/
        $route(){
            var vm = this;
            var num = (this.$route.hash.slice(1));
            var pos = document.querySelector("#a"+num).offsetTop-70;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()

            animate()
        }
    }

})

var Right=Vue.component('right',{
    template:`
       <div v-html="data" class="markdown-body">
       </div>
    `,
    data(){
        return{
            data:""
        }
    },
    mounted(){
        fetch("./html.txt").then(function(e){
            return e.text();
        }).then((e)=>{
            this.data = e;
        })
    }
})

var Quick=Vue.component('Quick',{
    template:`
    <div class="box">QuickQuickQuickQuickQuickQuick</div>
    `
})