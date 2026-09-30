// ESLint 9 扁平配置：一个数组，每项是一个"配置对象"，从上往下合并生效
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  // 忽略构建产物和依赖目录
  { ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/.turbo/**'] },

  // 基础推荐规则 + TS 推荐规则 + Prettier（放最后，冲突时以它为准）
  tseslint.configs.recommended,
  prettierRecommended,

  // 项目自定义覆盖
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }, // _开头的参数视为"故意不用"
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // 严格模式下尽量少用 any
    },
  },
)
