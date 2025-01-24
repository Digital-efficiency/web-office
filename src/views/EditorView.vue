<template>
  <div class="editor-view">
    <MdEditor
      pageFullscreen
      noPrettier
      autoDetectCode
      showToolbarName
      :preview="false"
      placeholder="请开始你的创作表演..."
      v-model="value" 
      :id="editorOptions.id"
      :modelValue="editorOptions.value"
      :previewTheme="editorOptions.theme"
      :codeTheme="editorOptions.codeTheme"
      :toolbars="editorOptions.tools"
      :footers="editorOptions.footers"
      @onSave="onSave"
    >
      <template #defFooters>
        <span>最后保存时间：{{ lastSaveTime }}</span>
      </template>
    </MdEditor>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { MdEditor } from 'md-editor-v3';
import { getCurrentFormattedTime, getTimeDifference } from '@/utils';
import { previewThemeList, codeThemeList, previewFileList } from '@/constant/previewer';
import 'md-editor-v3/lib/style.css';

const route = useRoute()
const parmas = route.query;
const value = ref('')
const lastSaveTime = ref('')

// 编辑器的设置
const editorOptions = ref({
  id: 'editor-only',
  theme: 'vuepress',
  codeTheme: 'atom',
  tools: [
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '-',
    'revoke',
    'next',
    'save',
    '=',
    'preview',
    'previewOnly',
    'htmlPreview',
    'catalog',
  ],
  footers: ['markdownTotal', 0, '=', 'scrollSwitch']
})

const onSave = (value, htmlPromise) => {
  console.log(value)

  htmlPromise.then(html => {
    console.log(html)
  })
}

onMounted(() => {
  // 测试数据，后续接入接口需要删除该数据
  const timeStr = "2023年01月09日 12:30:00";
  lastSaveTime.value = getTimeDifference(timeStr)
  // 根据 Query 参数设置预览设置
  if (parmas) {
    const theme = parmas.theme
    if (previewThemeList.includes(theme)) {
      editorOptions.value.theme = theme
    }
    const codeTheme = parmas.code_theme
    if (codeThemeList.includes(codeTheme)) {
      editorOptions.value.codeTheme = codeTheme
    }
  }
})

// Watch for route params changes and update title
watch(() => route.params.filename, (newFilename) => {
  document.title = newFilename ? `${newFilename} - 编辑` : '文档编辑';
}, { immediate: true });

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style scoped>
.editor-view {
  padding: 20px;
}

.preview-link {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.preview-link:hover {
  background-color: #45a049;
}
</style>
