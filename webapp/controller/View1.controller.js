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
                that = this;

                let data = [
                    {
                        name: "LOCATION  EXTRACT"
                    },
                    {
                        name: "CUSTOMER GROUP EXTRACT"
                    }, {
                        name: "PRODUCT AND ATTRIBUTES EXTRACT"
                    },
                    {
                        name: "MAINTAIN MRP"
                    },
                    {
                        name: "BILL OF MATERIALS EXTRACT"
                    },
                    {
                        name: "PARTIAL PRODUCTS EXTRACT"
                    },
                    {
                        name: "IPPE EXTRACT"
                    },
                    {
                        name: "DERIVED CHARACTERISTICS EXTRACT"
                    },
                    {
                        name: "SALES ORDER EXTRACT"
                    }
                ]

                let options = new sap.ui.model.json.JSONModel()
                options.setData({
                    items: data
                })
                that.byId("table").setModel(options)


                // create()
            },
            push_data: function () {
                let table = that.byId("table").getSelectedItems()


                for (let a = 0; a < table.length; a++) {
                    let selected_path = table[a].getCells()[0].getText()

                    switch (selected_path) {
                        case "LOCATION  EXTRACT": that.location_extract();
                            break
                        case "CUSTOMER GROUP EXTRACT": that.customer_extract();
                            break
                        case "PRODUCT AND ATTRIBUTES EXTRACT": that.product_extract();
                            break
                        case "MAINTAIN MRP": that.mainmrp_extract();
                            break
                        case "BILL OF MATERIALS EXTRACT": that.bom_extract();
                            break
                        case "PARITIAL PRODUCTS EXTRACT": that.part_prod_extract();
                            break
                        case "DERIVED CHARACTERISTICS EXTRACT": that.dervied_extract();
                            break
                        case "SALES ORDER EXTRACT": that.sales_extract();
                            break
                        case "IPPE EXTRACT": that.ippe_extract()
                            break
                    }
                }

            },
            location_extract: function ()   // location _stab -location 
            {
                var oData = that.getOwnerComponent().getModel()

                create()

                function read() {
                    return new Promise((resolve, reject) => {
                        oData.read('/LOCATION_STB', {
                            success: function (res) {
                                resolve(res.results)
                            },
                            error: function (err) {
                                reject(err)
                            }
                        })
                    })
                }

                function create() {
                    read()

                        .then((data) => {
                            data.forEach(obj => {
                                // batch request operation
                                oData.createEntry("/LOCATION", {
                                    properties: obj,
                                });
                            })

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

                function delete1() {
                    read()  // read call function
                    .then(((data)=>{
                        data.forEach(
                            obj=>{
                                let del_obj = obj.LOCATION_ID

                                oData.remove('/LOCATION_STB/' + del_obj), {
                                    success: function (da) {
                                        console.log(da)
                                    },
                                    error: function (error) {
                                        console.log(error)
                                    }
                                } 
                            }
                        )
                    }))
                }
            },
            customer_extract: function () {
                var oData = that.getOwnerComponent().getModel()
                create()
                function read() {
                    return new Promise((resolve, reject) => {
                        oData.read("/CUSTOMERS_STB", {
                            success: function (res) {
                                resolve(res.results)
                            },
                            error: function (err) {
                                reject(err)
                            }
                        })
                    })
                }

                function create() {
                    read()

                        .then((data) => {
                            data.forEach(element => {
                                oData.createEntry("/CUSTOMERS", {
                                    properties: element
                                })
                            });

                            oData.submitChanges({
                                success: function (o) {
                                    console.log(o)
                                    delete1()
                                },
                                error: function (error) {
                                    console.log(error)
                                }
                            })
                        })
                }

                function delete1() {
                    read()
                        .then((data) => {
                            data.forEach(ele =>{
                                oData.remove("/CUSTOMERS_STB/"+ele.CUSTOMER_GROUP,
                                {
                                    success: function (res) {
                                        console.log(res)
                                    },
                                    error: function (error) {
                                        console.log(error)
                                    }
                                })
                            })
                        

                        })
                }

            },
            product_extract:function()
            {

            },
            mainmrp_extract:function()
            {

            },
            bom_extract:function()
            {

            },
            part_prod_extract:function()
            {

            },
            dervied_extract:function()
            {

            },
            sales_extract: function () {
                let oData = that.getOwnerComponent().getModel()
               
                create_data()

                function read_sales() {   // reading the data from entity set's
                    return new Promise((resolve, reject) => {
                        oData.setDeferredGroups(["batchget"]);
                        oData.read("/SALES_STB", {
                            groupId: "batchget",
                            changeSetId: "batchget",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });
                        oData.read("/SALES_HIS_STB", {
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
                                let data_out = odata.__batchResponses
                                resolve(data_out)
                            },
                            error: function (error) {
                                reject(error)
                            }
                        })
                    })
                }

                function create_data()
                {
                    read_sales()

                    .then((data)=>{
                          
                        for (let index = 0; index < data[0].data.results.length; index++) {
                            const element = data[0].data.results[index];

                            oData.createEntry("/SALES", {
                                properties: element
                            })

                        }

                        for (let index1 = 0; index1 < data[1].data.results.length; index1++) {
                            const element = data[1].data.results[index1];
                            oData.createEntry("/SALES_HIS", {
                                properties: element
                            })

                        }

                        oData.submitChanges({
                            success: function () {
                                delete_mat_mdata()
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                    })

                }
                function delete_mat_mdata() {
                    read_sales()

                        .then((data) => {

                            let data1 = data[0].data.results

                            let data2 = data[1].data.results

                            for (let aa = 0; aa < data1.length; aa++) {

                                let element = data1[aa]

                                oData.remove("/SALES/" + element.SALES_DOCUMENT + "/" + element.SALES_DOCUMENT_ITEM , {
                                    success: function () {
                                        console.log("deleted")
                                    },
                                    error: function (error) {
                                        console.log(error)
                                    }
                                })
                            }


                            for (let a = 0; a < data2.length; a++) {

                                const element = data2[a];

                                oData.remove("/SALES_HIS/" + element.SALES_DOCUMENT + "/" + element.SALES_DOCUMENT_ITEM+"/"+element.CHARACTERSTIC, {
                                    success: function (ee) {
                                        console.log(ee)
                                    },
                                    error: function (re) {
                                        console.log(re)
                                    }
                                })
                            }


                        })
                }
            },
            ippe_extract:function()
            {
                let oData = that.getOwnerComponent().getModel()
                create_ippe()
                function read_ippe()
                {
                    return new Promise((resolve, reject) => {
                        oData.setDeferredGroups(["batchget1"]);
                        oData.read("/PROD_ACC_NODE_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });
                        oData.read("/OBJ_DEPEN_MAS_DATA_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });
                        oData.read("/PVBLL_MAT_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });
                        oData.read("/MAST_DATA_NODE_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });
                        oData.read("/ASS_COMP_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });

                        oData.read("/BOM_OBJ_DEPEN_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });

                        oData.read("/LOC_PRODID_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });

                        oData.read("/BOM_STAG_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function (oEvent) {

                            },
                            error: function (oError) {

                            }
                        });

                        oData.submitChanges({
                            groupId: "batchget1",
                            success: function (odata) {
                                let data_out = odata.__batchResponses
                                resolve(data_out)
                            },
                            error: function (error) {
                                reject(error)
                            }
                        })
                    })
                }
                function create_ippe()
                {
                    read_ippe()
                    .then((data)=>{
                        data[0].data.results.forEach(creat=>{
                            oData.createEntry("/PROD_ACC_NODE",{
                                properties:creat
                            })
                        })

                        data[1].data.results.forEach(creat=>{
                            oData.createEntry("/OBJ_DEPEN_MAS_DATA",{
                                properties:creat
                            })
                        })

                        data[2].data.results.forEach(creat=>{
                            oData.createEntry("/PVBLL_MAT",{
                                properties:creat
                            })
                        })

                        data[3].data.results.forEach(creat=>{
                            oData.createEntry("/MAST_DATA_NODE",{
                                properties:creat
                            })
                        })

                        
                        data[4].data.results.forEach(creat=>{
                            oData.createEntry("/ASS_COMP",{
                                properties:creat
                            })
                        })

                        data[5].data.results.forEach(creat=>{
                            oData.createEntry("/BOM_OBJ_DEPEN",{
                                properties:creat
                            })
                        })

                        data[6].data.results.forEach(creat=>{
                            oData.createEntry("/LOC_PRODID",{
                                properties:creat
                            })
                        })

                        data[7].data.results.forEach(creat=>{
                            oData.createEntry("/BOM_STAG",{
                                properties:creat
                            })
                        })


                        oData.submitChanges({
                            success:function(response)
                            {
                                console.log(response)
                                delete_ippe()
                            },
                            error:function(error)
                            {
                                console.log(error)
                            }
                        })
                    })
                }

                function delete_ippe()
                {
                    read_ippe()
                    .then((data)=>{
                        data[0].data.results.forEach(creat=>{
                            oData.remove("/PROD_ACC_NODE_STB/"+creat.LOCATION_ID+"/"+creat.PRODUCT_ID,{
                                success:function(){},
                                error:function(){}
                            })
                        })

                        data[1].data.results.forEach(creat=>{
                            oData.remove("/OBJ_DEPEN_MAS_DATA_STB/"+creat.OBJ_DEP+"/"+creat.OBJ_COUNTER+"/"+creat.CLASS_NUM+"/"+creat.CHAR_NUM+"/"+creat.CHAR_COUNTER+"/"+creat.CHARVAL_NUM,{
                                success:function(){},
                                error:function(){}
                            })
                        })

                        data[2].data.results.forEach(creat=>{
                            oData.remove("/PVBLL_MAT_STB/"+ creat.LOCATION_ID+"/"+creat.PRODUCT_ID +"/"+creat.ITM_NUM+"/"+creat.COMPONENT,{
                                success:function(){},
                                error:function(){}
                            })
                        })

                        data[3].data.results.forEach(creat=>{
                            oData.remove("/MAST_DATA_NODE_STB/"+creat.CHILD_NODE+"/"+create.PARENT_NODE,{
                                success:function(){},
                                error:function(){}
                            })
                        })

                        
                        data[4].data.results.forEach(creat=>{
                            oData.remove("/ASS_COMP_STB/"+creat.LOCATION_ID+"/"+creat.ASSEMBLY+"/"+creat.SUB_COMP,{
                                success:function(){},
                                error:function(){}
                            })
                        })

                        data[5].data.results.forEach(creat=>{
                            oData.remove("/BOM_OBJ_DEPEN_STB/"+creat.LOCATION_ID+"/"+creat.PRODUCT_ID+"/"+creat.ITEM_NUM+"/"+creat.COMPONENT+"/"+creat.DEPENDENCY,{
                                success:function(){},
                                error:function(){}
                            })
                        })

                        data[6].data.results.forEach(creat=>{
                            oData.remove("/LOC_PRODID_STB/"+creat.LOCATION_ID+"/"+creat.PRODUCT_ID,{
                                success:function(){},
                                error:function(){}
                            })
                        })

                        data[7].data.results.forEach(creat=>{
                            oData.remove("/BOM_STAG_STB/"+creat.LOCATION_ID+"/"+creat.PRODUCT_ID+"/"+creat.ITEM_NUM+"/"+creat.COMPONENT,{
                                success:function(){},
                                error:function(){}
                            })
                        })
                    })
                }
            }

        });
    });
