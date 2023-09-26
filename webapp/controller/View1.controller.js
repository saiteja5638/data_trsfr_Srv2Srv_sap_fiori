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
                var oData = that.getOwnerComponent().getModel()

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
                                // delete1()
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

                // delete1()

                create()
            }
        });
    });
