sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var that;
        
        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                that =this;
                
                let data = [
                    {
                        name: "LOCATION  EXTRACT"
                    },
                    {
                        name: "CUSTOMER"
                    }, {
                        name: "PRODUCT"
                    },
                    {
                        name: "MAINTAIN MRP"
                    },
                    {
                        name:"BILL OF MATERIALS EXTRACT"
                    },
                    {
                        name:"PARTIAL PRODUCTS EXTRACT"
                    },
                    {
                        name:"IIFE"
                    },
                    {
                        name:"DERVIED CHARACTERISTCS"
                    },
                    {
                        name:"SALES ORDERS"
                    }
                ]

                let options = new sap.ui.model.json.JSONModel()
                options.setData({
                    items:data
                })
                that.byId("table").setModel(options)


                // create()
            },
            push_data:function()
            {
                let table = that.byId("table").getSelectedItems()
               

                for(let a=0;a<table.length;a++)
                {
                    let selected_path = table[a].getCells()[0].getText()

                    switch(selected_path)
                    {
                        case "LOCATION  EXTRACT":that.location_extract();
                              break  
                        case "CUSTOMER":that.customer_extract();
                                break  
                        case "SALES ORDERS":that.sales_extract();
                              break         
                    }
                }

            },
            location_extract:function()   // location _stab -location 
            {
               var  oData = that.getOwnerComponent().getModel()

                create()

                function read()
                {
                    return new Promise((resolve, reject) => {
                        oData.read('/LOCATION',{
                            success:function(res)
                            {
                                resolve(res.results)  
                            },
                            error:function(err)
                            {
                                reject(err)
                            }
                        })
                    })
                }

                function create()
                {
                     read()

                     .then((data)=>{
                              for (var i = 0; i < data.length; i++) {
                            var dataObject = data[i]
                                // batch request operation
                            oData.createEntry("/LOCATION_IBP", {
                                properties: dataObject,
                            });

                        }

                        oData.submitChanges({
                            success: function (oData1) {
                                // Handle successful batch request
                                console.log("Batch request successful:", oData1);
                                delete1()
                            },
                            error: function (oError) {
                                // Handle error in batch request
                                console.error("Error in batch request:", oError);
                            },
                        });
                     })
                }

                function delete1()
                {
                    read()

                 .then((data)=>{
                    for(let a=0;a<data.length;a++)
                    {
                        let del_obj = data[a].LOCATION_ID

                        oData.remove('/LOCATION_IBP/'+del_obj),{
                            success:function(da)
                            {
                                console.log(da)
                            },
                            error:function(error)
                            {
                                console.log(error)
                            }
                        }
                    }
                })
                }
            },
            customer_extract:function()
            { 
               var oData = that.getOwnerComponent().getModel()
               create()
               function read()
               {
                 return new Promise((resolve, reject) => {
                    oData.read("/SALES_HISTORY",{
                        success:function(res)
                        {
                            resolve(res.results)
                        },
                        error:function(err)
                        {
                            reject(err)
                        }
                    })
                 })
               }
              
               function create()
               {
                read()

                .then((data)=>{
                    data.forEach(element => {
                        oData.createEntry("/SALES_HISTORY_STB",{
                            properties:element
                        })
                    });

                    oData.submitChanges({
                        success:function(o)
                        {
                            console.log(o)
                            delete1()
                        },
                        error:function(error)
                        {
                            console.log(error)
                        }
                    })
                })
               }

               function delete1()
               {
                  read()
                  .then((data)=>{
                    oData.remove("/SALES_HISTORY_STB",
                    {
                        success:function(res)
                        {
                            console.log(res)
                        },
                        error:function(error)
                        {
                            console.log(error)
                        }
                    })
                  })
               }

            },
            sales_extract:function()
            {
                let oData = that.getOwnerComponent().getModel()

                oData.setDeferredGroups(["batchget"]);
                oData.read("/LOCATION_IBP", {
                    groupId: "batchget",
                    changeSetId: "batchget",
                    success: function (oEvent) {

                    },
                    error: function (oError) {

                    }
                });
                oData.read("/LOCATION", {
                    groupId: "batchget",
                    changeSetId: "batchget",
                    success: function (oEvent) {

                    },
                    error: function (oError) {

                    }
                });
                oData.submitChanges({
                    groupId: "batchget",
                    success: function (odata) {
                       console.log(odata)
                    },
                    error: function () {
                        alert("Error");
                    }
                });


                // function sales_read()
                // {
                //     return new Promise((resolve, reject) => {
                //         oData.read("/SALES_HISTORY",{
                //             success:function(response)
                //             {
                //                 resolve(response.results)
                //             },
                //             error:function(error)
                //             {
                //                 reject(error)
                //             }
                //         })
                //     })
                // }

                // function sales_read()
                // {
                //     return new Promise((resolve, reject) => {
                //         oData.read("/SALES",{
                //             success:function(response)
                //             {
                //                 resolve(response.results)
                //             },
                //             error:function(error)
                //             {
                //                 reject(error)
                //             }
                //         })
                //     })
                // }


            }
        });
    });
