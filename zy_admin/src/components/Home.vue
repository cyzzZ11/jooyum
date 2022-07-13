<template >
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" @click="edit(text, record)"> 编辑 </a-button>
      </template>
    </a-table>

    <a-modal
      v-model="visible1"
      title="编辑"
      ok-text="提交"
      cancel-text="取消"
      @ok="hideModal"
    >
      <a-form :form="editForm">
        <a-form-item
          label="字段名称"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            hidden
            v-decorator="[
              'key',
              {
                rules: [{ required: true, message: 'Please input your name' }],
              },
            ]"
            placeholder="Please input your name"
          />
          <a-input
            hidden
            v-decorator="[
              'option',
              {
                rules: [{ required: true, message: 'Please input your name' }],
              },
            ]"
            placeholder="Please input your name"
          />
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Please input your name' }],
              },
            ]"
            placeholder="Please input your name"
          />
        </a-form-item>

        <a-form-item
          label="字段类型"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-select
            v-decorator="[
              'type',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' },
                ],
              },
            ]"
            placeholder="Select a option and change input text above"
          >
            <a-select-option value="单行文本"> 单行文本 </a-select-option>
            <a-select-option value="日期"> 日期 </a-select-option>
            <a-select-option value="单选下拉"> 单选下拉 </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="日期类型"
          v-if="editForm.getFieldValue('type') == '日期'"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-radio-group
            v-decorator="['option', { rules: [{ required: true }] }]"
          >
            <a-radio value="年-月"> 年-月 </a-radio>
            <a-radio value="年-月-日"> 年-月-日 </a-radio>
            <a-radio value="年-月-日时-分"> 年-月-日时-分 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="日期类型"
          v-if="editForm.getFieldValue('type') == '单选下拉'"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-select v-decorator="['option', { rules: [{ required: true }] }]">
            <div slot="dropdownRender" slot-scope="menu">
              <v-nodes :vnodes="menu" />
              <a-divider style="margin: 4px 0" />
              <div
                style="padding: 4px 8px; cursor: pointer"
                @mousedown="(e) => e.preventDefault()"
                @click="addItem"
              >
                <a-icon type="plus" /> Add item
              </div>
            </div>
            <a-select-option v-for="item in items" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="日期类型"
          v-if="editForm.getFieldValue('type') == '单行文本'"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'option',
              {
                rules: [{ required: true, message: 'Please input your name' }],
              },
            ]"
            placeholder="Please input your name"
          />
        </a-form-item>

        <a-form-item
          label="是否必填"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-switch
            checked-children="是"
            un-checked-children="否"
            v-decorator="[
              'required',
              {
                valuePropName:
                  editForm.getFieldValue('required') == true
                    ? 'checked'
                    : 'unchecked',

                rules: [{ required: true }],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model="visible2"
      ok-text="确认"
      cancel-text="取消"
      @ok="hideModalItem()"
      :dialog-style="{ top: '20px', width: '200' }"
    >
      <a-input
        v-model="newItem"
        placeholder="请输入新类型"
        style="margin-top: 30px"
      ></a-input>
    </a-modal>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default {
  name: "",
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      newItem: "",
      items: ["选项一", "选项二"],
      editForm: this.$form.createForm(this, {
        key: 0,
        name: "",
        option: "",
        required: "",
        type: "",
      }),
      formItemLayout,
      formTailLayout,
      visible1: false,
      visible2: false,
      columns: [
        {
          title: "字段名称",
          dataIndex: "name",
          width: 100,
        },
        {
          title: "字段类型",
          dataIndex: "type",
          width: 100,
        },
        {
          title: "是否必填",
          dataIndex: "required",
          width: 100,
        },
        {
          title: "字段选择",
          dataIndex: "option",
          width: 100,
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "operation" },
          width: 100,
        },
      ],
      data: [
        {
          key: 0,
          name: "字段一",
          type: "单行文本",
          required: "否",
          option: "无",
        },
        {
          key: 1,
          name: "字段二",
          type: "日期",
          required: "是",
          option: "年-月-日",
        },
        {
          key: 2,
          name: "字段三",
          type: "单选下拉",
          required: "是",
          option: "选项二",
        },
        {
          key: 3,
          name: "字段四",
          type: "单行文本",
          required: "是",
          option: "选项一",
        },
        {
          key: 4,
          name: "字段五",
          type: "单行文本",
          required: "是",
          option: "无",
        },
      ],
    };
  },
  methods: {
    // 编辑
    edit(text, record) {
      this.visible1 = true;
      this.$nextTick(() => {
        this.editForm.setFieldsValue({
          key: record.key,
          name: record.name,
          type: record.type,
          required: record.required == "是" ? true : false,
          option: record.option,
        });
      });
    },
    // 编辑 弹出框 下拉单选新增 二级弹出框 确定
    hideModalItem() {
      this.visible2 = false;
      if (this.newItem != "") {
        this.items.push(this.newItem);
        this.newItem = "";
      }
    },
    //编辑 弹出框 确定
    hideModal() {
      this.editForm.validateFields((err, values) => {
        if (!err) {
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].key == values.key) {
              this.data[i].name = values.name;
              this.data[i].type = values.type;
              this.data[i].required = values.required == true ? "是" : "否";
              this.data[i].option = values.option;
            }
          }
          this.$message.success("修改成功");
        }
      });
      this.visible1 = false;
    },
    addItem() {
      this.visible2 = true;
    },
  },
};
</script>

<style scoped>
</style>
