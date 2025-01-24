<template>
  <div class="preview-view" ref="scrollElement" v-show="!previewLoading">
    <template v-if="previewMode === 0">
      <MdPreview
        :id="previewerOptions.id"
        :modelValue="previewerOptions.value"
        :previewTheme="previewerOptions.theme"
      />
      <div class="fixed-btn" v-if="!openStatus">
        <a-button shape="circle" @click="changeOpenStatus">
          <icon-left />
        </a-button>
      </div>
      <a-drawer
        :width="200"
        header
        :footer="false"
        :visible="visible"
        @cancel="closeDrawer"
        unmountOnClose
      >
        <template #header>
          <span style="color: #000;">文档目录</span>
        </template>
        <MdCatalog :editorId="previewerOptions.id" :scrollElement="scrollElement.value" />
      </a-drawer>
    </template>
    <template v-else-if="previewMode === 1">
      <vue-office-docx
        :src="docxUrl"
        style="height: 100vh;width: 100vw;"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
    </template>
    <template v-else-if="previewMode === 2">
      <vue-office-excel
        :src="excelUrl"
        :options="xlsxOptions"
        style="height: 100vh;width: 100vw;"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
    </template>
    <template v-else-if="previewMode === 3">
      <vue-office-pdf 
        :src="pdfUrl"
        style="height: 100vh;width: 100vw;"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
    </template>
  </div>
  <div v-show="previewLoading" class="preview-loading">
    <a-spin dot />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import { Message } from '@arco-design/web-vue';
import { previewThemeList, codeThemeList, previewFileList } from '@/constant/previewer';
import { IconLeft, IconRight } from '@arco-design/web-vue/es/icon';
import '@vue-office/docx/lib/index.css'
import '@vue-office/excel/lib/index.css'
import 'md-editor-v3/lib/preview.css';

// 测试数据，后续接入接口需要删除该数据
const markdownContent = `
# 我的 Markdown 文件

这是一个使用 Markdown 格式编写的文件示例。Markdown 是一种轻量级的标记语言,可以帮助我们快速创建富文本格式的文档。

## 标题 2

这里是第二级标题。

### 标题 3

这里是第三级标题。

#### 列表

以下是一个无序列表示例:

- 列表项 1
- 列表项 2
- 列表项 3

这是一个有序列表示例:

1. 列表项 1
2. 列表项 2
3. 列表项 3

## 代码块

以下是一个 Python 代码块示例:

\`\`\`python
def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()
\`\`\`

## 链接和图像

您可以在 Markdown 中轻松插入链接和图像。例如:

[Devv.AI 官网](https://devv.ai)

![Devv.AI 标志](https://devv.ai/logo.png)
`;
const docxUrl = 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx'
const excelUrl = 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx'
const pdfUrl = 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf'

// 滚动dom节点，设置正确才会点击跳转
const scrollElement = ref(null);
const route = useRoute();
const parmas = route.query;
// 预览模式 0: markdown 1: docx 2: excel 3: pdf
const previewMode = ref(0)
// 预览设置
const previewerOptions = ref({
  id: 'preview-only',
  value: markdownContent,
  theme: 'vuepress',
  codeTheme: 'atom'
})
const xlsxOptions = ref({
  xls: false,
  minColLength: 0,
  minRowLength: 0,
  widthoffset: 10,
  heightoffset: 10,
  beforeTransformData: (workbookData) => { return workbookData },
  transformData: (workbookData) => { return workbookData }
})
// markdown目录状态
const openStatus = ref(false);
const visible = ref(false);
// 预览渲染加载状态
const previewLoading = ref(true);

// 打开目录
const changeOpenStatus = () => {
  openStatus.value = true;
  visible.value = true
};
// 关闭目录
const closeDrawer = () => {
  openStatus.value = false;
  visible.value = false;
};
// office文档渲染成功回调
const renderedHandler = () => {
  if (previewLoading.value) {
    Message.success('渲染成功')
  }
  previewLoading.value = false
}
// office文档渲染失败回调
const errorHandler = () => {
  if (previewLoading.value) {
    Message.error('渲染失败')
  }
}

onMounted(() => {
  // 根据 Query 参数设置预览设置
  if (parmas) {
    const theme = parmas.theme
    if (previewThemeList.includes(theme)) {
      previewerOptions.value.theme = theme
    }
    const codeTheme = parmas.code_theme
    if (codeThemeList.includes(codeTheme)) {
      previewerOptions.value.codeTheme = codeTheme
    }
  }
})

watch(() => route.params.filename, (newFilename) => {
  const fileInfos = newFilename.split('.')
  for (let index in previewFileList) {
    const fileInfo = fileInfos[fileInfos.length - 1]
    if (previewFileList[index].includes(fileInfo)) {
      previewMode.value = parseInt(index)
      break
    }
  }
  document.title = newFilename ? `${newFilename} - 预览` : '文档预览';
  if (previewMode.value === 0) {
    previewLoading.value = false
  }
}, { immediate: true });
</script>

<style scoped>
.preview-view {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.preview-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.fixed-btn {
  position: fixed;
  right: 16px;
  top: 5vh;
}

.vue-office-docx .docx-wrapper {
  padding: 0;
}
</style>
