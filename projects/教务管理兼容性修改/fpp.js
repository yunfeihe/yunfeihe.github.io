document.querySelectorAll('[name=subSysMenuSelectID]').forEach(el => el.id = 'subSysMenuSelectID');

loadTopMenu();
loadLevelOneMenu();

function send_request_foo(url, SystemBh) {
    http_request = false;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ei) {}
        }
    }
    if (!http_request) {
        window.alert("不能创建对象!");
        return false;
    }

    try {
        http_request.open("POST", url, false);

        http_request.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");

        http_request.send(null);

        var tmpxml = http_request.responseXML;
        console.log('tmpxml', tmpxml);
        //加载顶层菜单开始
        var topXml = tmpxml.selectNodes("/Menus/topMenus/Menu");
        for (i = 0; i < topXml.length; i++) {
            topMenuItems[topMenuLength] = new Array();
            topMenuItems[topMenuLength][0] = topXml[i].attributes.getNamedItem("parentid").text;
            topMenuItems[topMenuLength][1] = SystemBh + "_" + topXml[i].attributes.getNamedItem("id").text;
            topMenuItems[topMenuLength][2] = topXml[i].attributes.getNamedItem("name").text;
            topMenuItems[topMenuLength][3] = topXml[i].attributes.getNamedItem("title").text;
            topMenuItems[topMenuLength][4] = topXml[i].attributes.getNamedItem("path").text;
            topMenuLength++;
        }
        //加载顶层菜单结束
        	
        //加载一层菜单开始
        var menuXml = tmpxml.selectNodes("/Menus/Level1Menus/Menu");
        for (i = 0; i < menuXml.length; i++) {
            menuItems[menuLength] = new Array();
            menuItems[menuLength][0] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("parentid").text;
            menuItems[menuLength][1] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("id").text;
            menuItems[menuLength][2] = menuXml[i].attributes.getNamedItem("name").text;
            menuItems[menuLength][3] = menuXml[i].attributes.getNamedItem("title").text;
            menuItems[menuLength][4] = menuXml[i].attributes.getNamedItem("path").text;
            menuLength++;
        }
        //加载一层菜单结束

        //            //加载一层菜单开始
        //            var menuXmls = tmpxml.selectNodes("/Menus/LevelSMenus/Menu");
        //            for (i = 0; i < menuXmls.length; i++) {
        //                menuItemss[menuLengths] = new Array();
        //                menuItemss[menuLengths][0] = SystemBh + "_" + menuXmls[i].attributes.getNamedItem("parentid").text;
        //                menuItemss[menuLengths][1] = SystemBh + "_" + menuXmls[i].attributes.getNamedItem("id").text;
        //                menuItemss[menuLengths][2] = menuXmls[i].attributes.getNamedItem("name").text;
        //                menuItemss[menuLengths][3] = menuXmls[i].attributes.getNamedItem("title").text;
        //                menuItemss[menuLengths][4] = menuXmls[i].attributes.getNamedItem("path").text;
        //                menuLengths++;
        //            }
        //            //加载一层菜单结束

        //加载二层菜单开始
        var linkXml = tmpxml.selectNodes("/Menus/Level2Menus/Menu");
        for (i = 0; i < linkXml.length; i++) {
            linkItems[linkLength] = new Array();
            linkItems[linkLength][0] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("parentid").text;
            linkItems[linkLength][1] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("id").text;
            linkItems[linkLength][2] = linkXml[i].attributes.getNamedItem("name").text;
            linkItems[linkLength][3] = linkXml[i].attributes.getNamedItem("title").text;
            linkItems[linkLength][4] = linkXml[i].attributes.getNamedItem("path").text;
            linkLength++;
        }
        //加载二层菜单结束
    } catch (err) {
        console.log('err', err);
        alert("加载编号为" + SystemBh + "的应用系统失败，可能是网络延迟问题！");
    }

}

send_request_foo("http://xuanke.jgsu.edu.cn/JWXS/xsMenu.aspx", "0");