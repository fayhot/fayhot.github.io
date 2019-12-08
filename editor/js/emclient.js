$(function () {
    $("#emclient").removeAttr("class");
    var md=$("#mdeditor-textarea").text();
    $("#emclient").html("");
    var client = editormd("emclient", {
        width: "100%",
        height: 800,
        path: '/editor/lib/',
        theme: "dark",
        previewTheme: "eclipse",
        editorTheme: "pastel-on-dark",
        markdown: md,
        codeFold: true,
        saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
        searchReplace: true,
        htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        emoji: true,
        taskList: true,
        tocm: true,         // Using [TOCM]
        tex: true,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart: true,             // 开启流程图支持，默认关闭
        sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,

        // 工具栏添加一个自定义方法
        toolbarIcons: function() {
            // 给工具栏full模式添加一个自定义方法
            return editormd.toolbarModes.full.concat(["customIcon"]);
        },
        // 自定义方法的图标 指定一个FontAawsome的图标类
        toolbarIconsClass: {
            customIcon: "fa-paste"
        },
        // 没有图标可以插入内容，字符串或HTML标签
        toolbarIconTexts: {
            customIcon: "从草稿箱加载"
        },
        // 图标的title
        lang: {
            toolbar: {
                customIcon: "从草稿箱加载"
            }
        },
        // 自定义工具栏按钮的事件处理
        toolbarHandlers: {
            customIcon: function(){
                // 读取缓存内容
                client.CodeAutoSaveGetCache();
            }
        },
        // 自定义工具栏按钮的事件处理
        onload: function() {
            // 引入插件 执行监听方法
            editormd.loadPlugin("/editor/plugins/code-auto-save/code-auto-save", function() {
                // 初始化插件 实现监听
                client.CodeAutoSave();
                client.CodeAutoSaveGetCache();
            });
        }
    });

    // 删除缓存
    // client.CodeAutoSaveDelCache();
    // 清空缓存的文档内容
    // client.CodeAutoSaveEmptyCacheContent();
    // 自定义设置缓存
    // client.CodeAutoSaveSetCache('缓存内容');
    
    // client.setTheme('dark');
    // client.setEditorTheme('pastel-on-dark');
    
    window.emc = client;
});
