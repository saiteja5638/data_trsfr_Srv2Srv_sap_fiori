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
                        case "PARTIAL PRODUCTS EXTRACT": that.part_prod_extract();
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
                let oData = that.getOwnerComponent().getModel()
                create_prod()
                function prod_read()
                {
                    return new Promise((resolve, reject) => {
                        oData.setDeferredGroups(["batchget1"]);
                        oData.read("/PRODUCT_STB",
                         {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function () { },
                            error: function () { }
                        })
                        oData.read("/LOC_PRODID_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function () {

                             },
                            error: function () { }
                        })
                        oData.read("/CLASS_C_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function () { },
                            error: function () { }
                        })
                        oData.read("/PROD_CLASS_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function () { },
                            error: function () { }
                        })
                        oData.read("/CHARC_DATA_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function () { },
                            error: function () { }
                        })
                        oData.read("/CHARAC_VALUES_STB", {
                            groupId: "batchget1",
                            changeSetId: "batchget1",
                            success: function () { },
                            error: function () { }
                        })

                        oData.submitChanges({
                            groupId: "batchget1",
                            success:function(data)
                            {
                                resolve(data.__batchResponses)
                            },
                            error:function(error)
                            {
                                reject(error)
                            }
                        })
                    })

                }

                function create_prod()
                {
                    prod_read()   
                    .then((data)=>{
                     
                        data[0].data.results.forEach(obj => {
                            oData.createEntry("/PRODUCT", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[1].data.results.forEach(obj => {
                            oData.createEntry("/LOC_PRODID", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[2].data.results.forEach(obj => {
                            oData.createEntry("/CLASS_C", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[3].data.results.forEach(obj => {
                            oData.createEntry("/PROD_CLASS", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[4].data.results.forEach(obj => {
                            oData.createEntry("/CHARC_DATA", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[5].data.results.forEach(obj => {
                            oData.createEntry("/CHARAC_VALUES", {
                                success: function () { },
                                error: function () { }
                            })
                        })

                        oData.submitChanges({
                            success:function(odata)
                            {
                               console.log(odata)

                               delete_prod()
                            }
                        })
                    })
                }

                function delete_prod()
                {
                    prod_read()   
                    .then((data)=>{
                        data[0].data.results.forEach(obj => {
                            oData.remove("/PRODUCT_STB/"+obj.PRODUCT_ID, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[1].data.results.forEach(obj => {
                            oData.remove("/LOC_PRODID_STB/"+obj.LOCATION_ID+"/"+obj.PRODUCT_ID, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[2].data.results.forEach(obj => {
                            oData.remove("/CLASS_C_STB/"+obj.INT_CLS_NUMBER, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[3].data.results.forEach(obj => {
                            oData.remove("/PROD_CLASS_STB/"+obj.PRODUCT_ID+"/"+obj.CLASS, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[4].data.results.forEach(obj => {
                            oData.remove("/CHARC_DATA_STB/"+obj.INT_CLS_NUMBER+"/"+obj.CHAR_NAME, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[5].data.results.forEach(obj => {
                            oData.remove("/CHARAC_VALUES_STB/"+obj.INT_CHAR+"/"+obj.VALUE_NUM, {
                                success: function () {},
                                error: function () {}
                            })
                        })
                    })
                }

            },
            mainmrp_extract:function()
            {
                let oData = that.getOwnerComponent().getModel()
                create_main()
                function read_maintain()
                {
                    return new Promise((resolve, reject) => {
                        oData.read("/MAINT_MRP_STB",{
                            success:function(response){
                                resolve(response.results)
                            },
                            error:function(error){
                                reject(error)
                            }
                        }) 
                    })
                }

                function create_main()
                {

                    read_maintain()

                    .then((data)=>{
                        data.forEach(obj=>[
                            oData.create("/MAINT_MRP",{
                                success:function(){delete_()},
                                error:function(){}
                            })
                        ])
                    })
                }

                function delete_()
                {
                    read_maintain()

                    .then((data)=>{
                        data.forEach(obj=>{
                            oData.remove("/MAINT_MRP_STB/"+obj.LOCATION_ID+"/"+obj.MRP_GROUP,{
                                success:function(){},
                                error:function(){}
                            })
                        })
                    })
                }

            },
            bom_extract:function()
            {
                let oData = that.getOwnerComponent().getModel()
                create_bom()  
                function bom_read()
                {
                   return new Promise((resolve, reject) => {
                    oData.setDeferredGroups(["bomgroup"])
                    oData.read("/BOM_STAG_STB ", {
                        groupId: "bomgroup",
                        changeSetId: "bomgroup",
                        success:function(){},
                        error:function(){}
                    })
                    oData.read("/BOM_OBJ_DEPEN_STB", {
                        groupId: "bomgroup",
                        changeSetId: "bomgroup",
                        success:function(){},
                        error:function(){}
                    })
                    oData.read("/ASS_COMP_STB", {
                        groupId: "bomgroup",
                        changeSetId: "bomgroup",
                        success:function(){},
                        error:function(){}
                    })
                    oData.read("/OBJ_DEPEN_MAS_DATA_STB", {
                        groupId: "bomgroup",
                        changeSetId: "bomgroup",
                        success:function(){},
                        error:function(){}
                    })
                    oData.read("/LOC_PRODID_STB", {
                        groupId: "bomgroup",
                        changeSetId: "bomgroup",
                        success:function(){},
                        error:function(){}
                    })
    
                    oData.submitChanges({
                        groupId:"bomgroup",
                        success:function(response)
                        {
                            resolve(response.__batchResponses)
                        },
                        error:function(error)
                        {
                            reject(error)
                        }
                    })
                   })
                }

                function create_bom()
                {
                    bom_read()

                    .then((data)=>{
                                            
                        data[0].data.results.forEach(obj => {
                            oData.createEntry("/BOM_STAG", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[1].data.results.forEach(obj => {
                            oData.createEntry("/BOM_OBJ_DEPEN", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[2].data.results.forEach(obj => {
                            oData.createEntry("/ASS_COMP", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[3].data.results.forEach(obj => {
                            oData.createEntry("/OBJ_DEPEN_MAS_DATA", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[4].data.results.forEach(obj => {
                            oData.createEntry("/LOC_PRODID", {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        oData.submitChanges({
                            success:function(odata)
                            {
                               console.log(odata)
                               delete_bom()
                            }
                        })
                    })
                }

                function delete_bom()
                {
                    bom_read()
                    .then((data)=>{
                                            
                        data[0].data.results.forEach(obj => {
                            oData.remove("/BOM_STAG_STB/"+obj.LOCATION_ID+"/"+obj.PRODUCT_ID+"/"+obj.ITEM_NUM+"/"+obj.COMPONENT, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[1].data.results.forEach(obj => {
                            oData.remove("/BOM_OBJ_DEPEN_STB/"+obj.LOCATION_ID+"/"+obj.PRODUCT_ID+"/"+obj.ITEM_NUM+"/"+obj.COMPONENT+"/"+obj.DEPENDENCY, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[2].data.results.forEach(obj => {
                            oData.remove("/ASS_COMP_STB/"+obj.LOCATION_ID+"/"+obj.ASSEMBLY+"/"+obj.SUB_COMP, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[3].data.results.forEach(obj => {
                            oData.remove("/OBJ_DEPEN_MAS_DATA_STB/"+obj.OBJ_DEP+"/"+obj.OBJ_COUNTER+"/"+obj.CLASS_NUM+"/"+obj.CHAR_NUM+"/"+obj.CHAR_COUNTER+"/"+obj.CHARVAL_NUM, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                        data[4].data.results.forEach(obj => {
                            oData.remove("/LOC_PRODID_STB/"+obj.LOCATION_ID+"/"+obj.PRODUCT_ID, {
                                success: function () { },
                                error: function () { }
                            })
                        })
                    })
                }
                
            },
            part_prod_extract:function()
            {
                let oData = that.getOwnerComponent().getModel()
                
                function part_prod_read()
                {
                    return new Promise((resolve, reject) => {
                        oData.setDeferredGroups(["part_prod"])

                        oData.read("/PROD_CONF_STB",{
                            groupId: "part_prod",
                            changeSetId: "part_prod",
                            success:function(){},
                            error:function(){}
                        })
                        oData.read("/MAT_LTE_MDATA_STB",{
                            groupId: "part_prod",
                            changeSetId: "part_prod",
                            success:function(){},
                            error:function(){}
                        })
                        oData.read("/LOC_PRODID_STB",{
                            groupId: "part_prod",
                            changeSetId: "part_prod",
                            success:function(){},
                            error:function(){}
                        })

                        oData.submitChanges({
                            success:function(response)
                            {
                                resolve(response.__batchResponses)
                            },
                            error:function()
                            {
                                reject(error)
                            }
                        })
                    })
                }
                function create_part_prod() {
                    part_prod_read()

                        .then((data) => {

                            data[0].data.results.forEach(obj => {
                                oData.createEntry("", {
                                    success: function () { },
                                    error: function () { }
                                })
                            })
                            data[1].data.results.forEach(obj => {
                                oData.createEntry("", {
                                    success: function () { },
                                    error: function () { }
                                })
                            })

                            data[2].data.results.forEach(obj => {
                                oData.createEntry("", {
                                    success: function () { },
                                    error: function () { }
                                })
                            })

                            oData.submitChanges({
                                success: function (data) {
                                    console.log(data)
                                },
                                error: function () {
                                    console.log(data)
                                }
                            })
                        })

                }
                
            },
            dervied_extract:function()
            {
                let oData = that.getOwnerComponent().getModel()
                create_()
                function dervied_read()
                {
                    return new Promise((resolve, reject) => {
                        oData.read("/DERIVECHAR_STB",{
                            success:function(response)
                            {
                               resolve(response.results)
                            },
                            error:function()
                            {
                                reject(error)
                            }
                        })
                    })
                }

            function create_()
            {
                dervied_read()

                .then((data)=>{
                    data.forEach(obj=>{
                        oData.create("DERIVECHAR",obj,{
                            success:function(){
                                sap.m.MessageToast.show("created")

                                delete_obj()
                            },
                            error:function(error){}
                        })
                    })

                })
            }
            function delete_obj()
            {
                dervied_read()

                .then((data)=>{
                    data.forEach(obj=>{
                        oData.remove("/DERIVECHAR_STB/"+obj.PRODUCT_ID+"/"+obj.RECORD_TYPE+"/"+obj.CLAUSE+"/"+obj.DEP_NAME+"/"+obj.CHAR_NUM+"/"+obj.CHARVAL_NUM+"/"+SORT_COUNTER+"/"+obj.CHAR_COUNTER+"/"+obj.INT_CLS_NUMBER,{
                            success:function()
                            {
                                console.log("success")
                            },
                            error:function()
                            {
                                console.log("error")
                            }
                        })   
                    })
                    
                })
            }
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

                        data[0].data.results.forEach(obj=>{
                            
                            oData.createEntry("/SALES", {
                                properties: obj
                            })
                        })

                        data[1].data.results.forEach(obj1=>{
                            oData.createEntry("/SALES_HIS", {
                                properties: obj1
                            })
                        })

                        oData.submitChanges({
                            success: function () {
                                console.log("created")
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

                            if(data1.length ==0 || data2.length==0)
                            {
                                alert("no data")
                            }

                            else
                            {
                                data1.forEach(element=>{
                                    oData.remove("/SALES_STB/" + element.SALES_DOCUMENT + "/" + element.SALES_DOCUMENT_ITEM , {
                                        success: function () {
                                            console.log("deleted")
                                        },
                                        error: function (error) {
                                            console.log(error)
                                        }
                                    })
                                })

                                data2.forEach(element=>{
                                    oData.remove("/SALES_HIS_STB/" + element.SALES_DOCUMENT + "/" + element.SALES_DOCUMENT_ITEM+"/"+element.CHARACTERSTIC, {
                                        success: function (ee) {
                                            console.log(ee)
                                        },
                                        error: function (re) {
                                            console.log(re)
                                        }
                                    })
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
