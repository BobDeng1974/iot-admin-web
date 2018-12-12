<template>
  <div class="documentManagement-warp">
    <button id="addParent" href="#" title="增加节点" @click.prevent="add({isParent:true})">增加节点</button>
    <div class="container">
      <div class="nav">
        <ul id="treeDemo" class="ztree"></ul>
      </div>
      <div class="doc-content" v-if="docDetail!=null">
        <div id="doc-nav">
          <div id="doc-title">{{docDetail.menuTitle}}</div>
          <div id="doc-op">
            最后更新:
            <label id="doc-update-time">{{docDetail.updatedTime}}</label>&nbsp;
            <span @click.prevent="showEdit()" class="show-edit">编辑</span>
          </div>
        </div>
        <div id="doc-content" v-html="docDetail.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getToken } from "@/utils/auth";
  import "./static/js/zTree/jquery-3.3.1.min";
  import "./static/js/zTree/jquery.ztree.all.min";
  import "@/assets/css/zTreeStyle.css";
  import request from "@/utils/http";
  const { APPLICATION_NAME } = window.environment.iotserver;
  export default {
    data() {
      return {
        apiRootPath: `${APPLICATION_NAME}/`,
        zTreeObj: null,
        docDetail: null,
        newCount: 1,
        setting: {
          view: {
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom,
            selectedMulti: false,
            showIcon: false
          },
          edit: {
            enable: true,
            showRemoveBtn: true,
            showRenameBtn: true
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            beforeRemove: this.beforeRemove,
            beforeRename: this.beforeRename,
            onRemove: this.onRemove,
            onRename: this.onRename,
            onClick: this.zTreeOnClick
          }
        },
        zNodes: []
      };
    },
    mounted() {
      this.initZtree();
    },
    methods: {
      removeHoverDom(treeId, treeNode) {
        $("#addBtn_" + treeNode.tId)
          .unbind()
          .remove();
      },
      beforeRemove(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
          nodes = zTree.getSelectedNodes(),
          treeNode = nodes[0];
        if (nodes.length == 0) {
          alert("请先选择一个节点");
          return false;
        } else {
          var isParent = treeNode.isParent;
          if (isParent) {
            alert("不能直接删除父节点");
            return false;
          } else {
            var flag = window.confirm("确定删除该节点吗");
            if (flag) {
              return true;
            }
            return false;
          }
        }
      },
      onRemove(e, treeId, treeNode) {
        var that = this;
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        request({
          url: that.apiRootPath + "doc/delMenu",
          method: "POST",
          data: {
            mid: treeNode.id
          }
        }).then(response => {
          //var callbackFlag = $("#callbackTrigger").attr("checked");
          zTree.removeNode(treeNode);
          that.docDetail = null;
        });
      },
      beforeRename(treeId, treeNode, newName, isCancel) {
        if (isCancel) {
          return false;
        }
        let menuName = "";
        if (newName.length == 0) {
          alert("节点名称不能为空");
        } else if ($.trim(newName).length == 0) {
          alert("节点名称不能为空字符串");
        } else {
          menuName = newName;
        }
        if (menuName == "") {
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          setTimeout(function() {
            zTree.editName(treeNode);
          }, 10);
          return false;
        }
        return true;
      },
      addHoverDom(treeId, treeNode) {
        var that = this;
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
          return;
        var addStr =
          "<span class='button add' id='addBtn_" +
          treeNode.tId +
          "' title='add node' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_" + treeNode.tId);
        if (btn) {
          btn.bind("click", function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var id = that.newCount++;
            let pid = treeNode.id;
            let mid = id;
            request({
              url: that.apiRootPath + "doc/checkLevel",
              method: "POST",
              data: {
                mid: treeNode.id,
                pid: treeNode.pId
              }
            }).then(response => {
              let result = response.result;
              let maxChild = result.maxChild;
              let count = result.count;
              if (count >= maxChild) {
                alert("最多只能创建" + maxChild + "个子节点");
                return false;
              } else {
                zTree.addNodes(treeNode, {
                  id: id,
                  pId: treeNode.id,
                  name: "new node" + that.newCount++
                });
                sessionStorage.setItem("pid", pid);
                sessionStorage.setItem("mid", mid);
                that.$router.push({ path: "addDevDoc" });
                return false;
              }
            });
          });
        }
      },
      add(params) {
        var that = this;
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
          isParent = params.isParent,
          nodes = zTree.getSelectedNodes(),
          treeNode = nodes[0];
        if (treeNode) {
          treeNode = zTree.addNodes(treeNode, {
            id: that.newCount,
            pId: treeNode.id,
            isParent: isParent,
            name: "new node" + that.newCount++
          });
        } else {
          treeNode = zTree.addNodes(null, {
            id: that.newCount,
            pId: 0,
            isParent: isParent,
            name: "new node" + that.newCount++
          });
        }
        let pid = $.isEmptyObject(treeNode[0].pId) ? 0 : treeNode[0].pId;
        let mid = treeNode[0].id;
        sessionStorage.setItem("pid", pid);
        sessionStorage.setItem("mid", mid);
        this.$router.push({ path: "addDevDoc" });
      },
      onRename(e, treeId, treeNode, isCancel) {
        var that = this;
        request({
          url: that.apiRootPath + "doc/updateMenu",
          method: "POST",
          data: {
            mid: treeNode.id,
            menuTitle: treeNode.name
          }
        }).then(response => {
          that.docDetail.menuTitle = treeNode.name;
        });
        //showLog((isCancel ? "<span style='color:red'>" : "") + "[ " + getTime() + " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>" : ""));
      },
      zTreeOnClick(event, treeId, treeNode) {
        var that = this;
        let mid = treeNode.id;
        if (treeNode.pId != null) {
          request({
            url: that.apiRootPath + "doc/detail",
            method: "POST",
            data: {
              mid: treeNode.id
            }
          }).then(response => {
            that.docDetail = response.result;
          });
        }
      },
      initZtree() {
        var that = this;
        sessionStorage.removeItem("pid");
        sessionStorage.removeItem("mid");
        request({
          url: that.apiRootPath + "doc/allMenu",
          data: {
            docType: 0
          },
          method: "POST"
        }).then(response => {
          if (response) {
            that.zNodes = response.result;
            request({
              url: that.apiRootPath + "doc/count",
              method: "POST"
            }).then(response => {
              that.newCount = parseInt(response.result) + 10;
              that.zTreeObj = $.fn.zTree.init(
                $("#treeDemo"),
                that.setting,
                that.zNodes
              );
              $(document).mouseup(function(e) {
                var _con = $("#treeDemo"); // 设置目标区域
                if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                  that.zTreeObj.checkAllNodes(false);
                  that.zTreeObj.cancelSelectedNode();
                }
              });
            });
          }
        });
      },
      showEdit() {
        sessionStorage.setItem("mid", this.docDetail.mid);
        this.$router.push({ path: "editDevDoc" });
      }
    }
  };
</script>
<style scoped>
  .ztree li span.button.add {
    margin-left: 2px;
    margin-right: -1px;
    background-position: -144px 0;
    vertical-align: top;
    *vertical-align: middle;
  }

  .container,
  #doc-nav {
    display: -webkit-flex;
    display: flex;
    margin-bottom: 20px;
  }

  .nav {
    min-width: 200px;
    max-width: 400px;
    width: auto;
  }

  .doc-content,
  #doc-title,
  #doc-op {
    -webkit-flex: 1;
    flex: 1;
  }

  #doc-op span {
    background: blue;
    padding: 2px 3px;
    color: white;
  }

  .doc-content {
    word-wrap: break-word;
    word-break: break-all;
    margin-left: 3px;
  }
  .show-edit {
    cursor: pointer;
  }
</style>
