
    var app=angular.module('reminder',[]);
    app.directive('cateUl',[function () {
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:' <ul class="list-group"><div ng-transclude></div></ul>',
            link:function (scope,el) {
                // console.log(el)
                $(el).on('mousedown',false);
                $(el).on('click','li',function (e) {
                    $(el).find('li').removeClass('active');
                    $(this).addClass('active');

                })
                $(el).on('dblclick','li',function () {
                    $(this).addClass('edit');
                    var input=$(el).find('li input');
                    input.val(input.val()).focus();
                });
                $(el).on('blur','li input',function () {

                    $(this).closest('li').removeClass('edit');
                });
                $(el).on('keyup',false);
                $(document).on('keyup',function (e) {
                    var id=parseInt($(el).find('.active').attr('data-id'));
                    if(e.keyCode==46){
                        scope.$apply(function () {
                            scope.cates=scope.cates.filter(function (v,i) {
                                return id!==v.id;

                            })
                        })
                    }
                })
            }
        }
    }]);
    app.directive('myOption',[function () {
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:'<div class="ni"><div ng-transclude></div></div>',
            link:function(scope,el) {
                $(el).on('click','#op',function () {
                    $(el).closest('.remider').find('.sel').show();
                });

                // $(el).find('.sel').on('click',false);
                $(el).find('#cancel').on('mousedown',false);

                $(el).on('click','#cancel',function () {
                    $(el).find('.sel').hide();
                });
                $(el).on('click','.color-sel li',function () {
                    var color=$(this).attr('class')
                    $(el).find('.color-sel li').removeClass('active');
                    $(this).addClass('active');
                    scope.$apply(function () {
                        scope.current.theme=color;
                    });
                    $(el).find('.sel input').css('color',color);
                    $(el).prev().find('.title').css('color',color);
            })
            }
        }
    }]);
    app.directive('myJia',[function () {
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:'<div class="big"><div ng-transclude></div></div>',
            link:function (scope,el) {
                $(el).on('click','ul .item',function () {
                    $(el).find('ul .item').removeClass('active');
                    $(this).addClass('active');
                    var input=$(this).find('.content input')
                    input.val(input.val()).focus();
                })
                $(el).on('blur','ul .item input',function () {
                    var val=$(this).val();
                    var id=$(this).closest('li').attr('data-id');
                    $(this).prev().text( val );
                    scope.$apply(function () {
                        scope.current.todos.forEach(function (v,i) {
                             if(id==v.id){
                                 v.title=val;
                             }
                        })
                        // scope.current.todos[index].title=val;
                    })
                    $(this).closest('li').removeClass('active');
                })
            }
        }
    }]);
    app.directive('myList',[function () {
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:'<div><div ng-transclude></div></div>',
            link:function (scope,el) {
                $(el).on('click','.zong .icon',function () {
                    $(this).closest('.zong').toggleClass('active');
                    $(this).closest('.big').find('.yin').slideToggle();
                })
                var one,two;
                // $(el).on('touchstart','.item',function (e) {
                //     one=e.originalEvent.changedTouches[0].pageX;
                // })
                // $(el).on('touchend','.item',function (e) {
                //     two=e.originalEvent.changedTouches[0].pageX;
                //     var xia=$(this).index();
                //     if(one>two){
                //         $(this).css({'transition':'all .3s ease','transform':'translate3d(-100%,0,0)'}).delay(300).queue(function () {
                //     $(this).css('display','none').dequeue();
                //             scope.$apply(function () {
                //                 scope.current.todos.splice(xia,1);
                //                 console.table(scope.current.todos)
                //             })
                //         })
                //     }
                // })

                // $(el).on('mousedown','.item',function (e) {
                //     one=e.clientX;
                //     $(this).on('mousemove',function (e) {
                //         two=e.clientX;
                //         var xia=$(this).index();
                //         // console.log(xia)
                //         if(one-two>100){
                //
                //             $(this).css({'transition':'all .8s ease','transform':'translate3d(-100%,0,0)'}).delay(800).queue(function () {
                //                 $(this).css('display','none').dequeue();
                //                 scope.$apply(function () {
                //                     scope.current.todos.splice(xia,1);
                //                     if(scope.current.todos[xia].state==1){
                //                         scope.index-=1;
                //                     }else if(scope.current.todos[xia].state==0){
                //                         scope.index=scope.index;
                //                     }
                //                 })
                //             })
                //         }
                //     })
                // })

            }
        }
    }])
    app.controller('myCtrl',['$scope',function ($scope) {
        $scope.colors=['purple','green','blue','yellow','pink','brown','orange'];
        $scope.index=0;

        $scope.cates=[
            {id:1001,'title':'新列表1','theme':'purple','todos':[
                {id:1,title:'aa',state:0},
                {id:2,title:'bb',state:1},
                {id:3,title:'cc',state:0},
                {id:4,title:'dd',state:1}
            ]},
            {id:1002,'title':'新列表2','theme':'yellow','todos':[
                {id:1,title:'aa',state:0},

                {id:3,title:'cc',state:0},
                {id:4,title:'dd',state:1}
            ]},
            {id:1003,'title':'新列表3','theme':'blue','todos':[
                {id:1,title:'aa',state:0},
                {id:2,title:'bb',state:1},

                {id:4,title:'dd',state:1}
            ]}

        ];
        //新增类目
        $scope.add=function () {
            var max=-Infinity;
            $scope.cates.forEach(function (v,i) {
                if(max<v.id){
                    max=v.id
                }
            })
            var id=max+1;
            var item={
                id:id,theme:$scope.colors[$scope.cates.length%7],title:'新列表'+($scope.cates.length+1),todos:[]
            }
           $scope.cates.push(item);

        };
        // 当前类目
        $scope.current=$scope.cates[0];
        // 设置当前显示类目
        $scope.setCurrent=function (v) {
            $scope.current=v;
            if(v.todos.length==0){
                $scope.index=0
            }else{
                    var arr=v.todos.filter(function (v,i) {
                        return v.state==1
                    });
                $scope.index=arr.length;

            }
        };
        //新增项目
        $scope.addtodo=function (e) {
            var max=-Infinity;
            $scope.current.todos.forEach(function (v,i) {
                if(max<v.id){
                    max=v.id
                }
            });
            var id=max+1;
            var item={
                id:id,title:'新项目'+($scope.current.todos.length+1),state:0
            };
            // if(e.keyCode==13){
                $scope.current.todos.push(item);
                $scope.tt='';
            // }
            
        };
        // 删除项目
        $scope.deltodo=function (id) {
            // if(e.keyCode==46){
                $scope.current.todos=$scope.current.todos.filter(function (v,i) {
                    return v.id!==id;
                })
            // }

        };
        // 选项中删除类目
        $scope.delCat=function (id) {
            $scope.cates=$scope.cates.filter(function (v,i) {
                return v.id!==id;
            })
            console.table($scope.cates)
            $scope.current=$scope.cates[0];
        };
        // 已完成条目数量
        $scope.current.todos.forEach(function (v,i) {
            if(v.state==1){
                $scope.index+=1
            }
        })
        $scope.done=function () {
            $scope.index+=1
        };
        $scope.isdone=function () {
            $scope.index-=1;
        };
        //清除已完成
        $scope.clear=function () {
            $scope.current.todos=$scope.current.todos.filter(function (v,i) {
                return v.state!==1;
            })
           $scope.index=0;
        }
        // 手动清除完成
        
       

    }]);

    

   

