## **getFileInfo**

> 获取文件信息

预览https://upload.webwlx.cn/

#### 安装

``` shell
npm i getFileInfo -S
```

### 引入

``` js
import { getFileInfo } from 'getFileInfo;
```

#### 使用

``` js
// 注意，需要使用 async await
let fileInfo = await getFileInfo(file);// file 参数为源文件
```

#### API

| 事件名称     | 说明               |
| ------------ | ------------------ |
| getFileInfo  | 获取全部的参数     |
| formatSize   | 获取大小           |
| getSuffix    | 获取后缀名         |
| getImgInfo   | 获取图片宽高       |
| getVideoInfo | 获取视频宽高和时长 |
| getFileMd5   | 获取文件的MD5值    |

### 回调值

| 字段名         | 说明                                                    |
| -------------- | ------------------------------------------------------- |
| name           | 文件名                                                  |
| type           | 文件类型                                                |
| fileUrl        | 临时路径                                                |
| suffix         | 后缀名                                                  |
| formatSize     | 格式化后的文件大小                                      |
| lastUpdateTime | 最后修改时间                                            |
| sizeData       | `width`,`height`,·`duration` （时长单位为秒，宽高为px） |
| fileMd5        | 文件的MD5值                                             |

