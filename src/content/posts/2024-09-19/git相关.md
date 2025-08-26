---
title: git相关
description: git相关的命令详细说明
published: 2024-09-19 09:53:11
updated: 2024-09-19 10:16:01
draft: false
series:
tags:
  - git命令
category: git
pinned: true
author: zwl
licenseName: CC BY 4.0
sourceLink: https://blog.zzzero.site/posts/2024-09-19/git相关/
image: http://www.98qy.com/sjbz/api.php?r=26095318
---
## 1. 相关命令 
```shell
# 远程
origin main
origin branch_test
# 本地
main
branch_test

# 三层
# remote
# Local
# Disk

# 修改代码步骤
https://www.bilibili.com/video/BV19e4y1q7JJ
# 1. remote-->Local、Disk
git clone xxx

# 2. 新建分支，并且将main分支的代码拉到branch_test上
# 方式1 在main分支下
git chechout -b branch_test
# 方式2
# 查看当前所有分支
git branch -v 
git branch -a
# 创建分支
git branch branch_test
# 切换分支到branch_test
git checkout branch_test
# 拉取本地Local的main分支
git pull main
# 切回到main，其中"_"表示切换到上一个分支
# git chechout -

# 3. 在branch_test分支下，修改代码（修改的是Disk上的代码，所以Disk上的文件和Local上的文件不一致）
# 查看有什么改变？
git diff

# 4. 将Disk上的文件拷贝到暂存区
git add .

# 5. 将暂存区的文件推到Local中
git commit -m "更新信息"

# 6. 将Local中的文件推到Remote
# 这一步之前可以**先看看main分支有没有更新**，有更新的话直接跳到7， 没有更新的话可以执行
# git push origin branch_test

# 正常上面已经结束，只需要提交pull request到main就行了，但是

# 7. 注意：push到origin branch_test之后，发现origin main已经更新了，怎么办
# 切换到main分支
git checkout main
# 拉取远程origin main分支，执行之后，origin main 就同步到了Local的main和Disk
git pull origin main

##### 此时 Local中   有两个分支  
main    更新之后的main
branch_test 
所以后面，需要在Disk上合并这两个分支

# 切换到branch_test
git checkout branch_test
# 在main上合并branch_test， ❌这里为什么用git rebase main, 而不用  git merge main ??
# 这样Disk Local上的branch_test就是 **新更新的main+自己修改的branch_test** 的内容，如果rebase conflict，手动选择哪一段代码
git rebase main

# 8. 再测试 **新更新的main+自己修改的branch_test** 的内容，有没有问题

# 9. 有问题再修改推到Local(git add . git commit -m "")，修改完推到Remote（或者没问题）
# 在branch_test分支下
git push -f origin branch_test

# 10. 推到origin branch_test之后， 需要new 一个pull request(将origin branch_test分支pull到origin main)

# 11. 在main分支review，没问题的话Sqush and merge，将将origin branch_test分支合并到origin main
# Sqush：将这个分支上的所有改变，合并成一个改变

# 12. 一般情况下，被merge之后，
- 删掉 origin branch_test
- 删掉 branch_test
	git checkout main
	git branch -D branch_test
	
# ❌这里为什么用git rebase main, 而不用  git merge main ??
git rebase 之后结构更简洁，减轻大量merge线条太多的问题
git merge 能保留原有的分支结构
```



## 2. git merge 和 git rebase区别
![](assets/Pasted%20image%2020250826100533.png)![](assets/Pasted%20image%2020250826100551.png)