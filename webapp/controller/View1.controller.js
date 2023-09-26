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
                let table = that.byId("table")
                let selected_path = table.getSelectedItems()[0].getCells()[0].getText()
                     
                switch(selected_path)
                {
                    case "LOCATION  EXTRACT":that.location_push();
                          break  
                        
                }

                function call()
                {
                    console.log("hi how  are u ")
                }
                  
            },
            location_push:function()
            {
                var oData = that.getOwnerComponent().getModel()

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
                                properties: { LOCATION_ID: dataObject.LOCATION_ID },
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
            }
        });
    });
