import React, { useRef, useState } from 'react';
import './Main.scss';
import uuid from '../utils/uuid';

export default function Main() {
  const inputBox = useRef();

  const [inputList, setinputList] = useState([]); // 输入框列表
  const [learningList, setLearningList] = useState([]); // 学习任务列表
  const [completeList, setCompleteList] = useState([]); // 完成任务列表
  let dropId = ''; // 拖拽的id
  let dragBelong = ''; // 拖拽的belong

  const [showBorder, setShowBorder] = useState(''); // 边框状态设置

  // 添加输入框
  function add() {
    setinputList([{ id: uuid(), text: '', belong: 'inputList', showIcon: false }, ...inputList]);
  }

  // 输入框值改变
  let handleInoutChange = (e, id) => {
    let item = inputList.find(item => item.id === id);
    item.text = e.target.value;
    let subList = inputList.filter(item => item.id !== id)
    setinputList([item, ...subList]);
  }

  // 鼠标移入 显示 删除按钮
  function deleteIconShow({ belong, showIcon, id }, idnex) {
    if (belong === 'inputList') {
      // 找到并修改数组中的当前元素
      const newInputList = inputList.map((item, index) => {
        if (index === idnex) {
          return { ...item, showIcon: true };
        }
        return item;
      }
      );
      setinputList(newInputList);
    }
    if (belong === 'learningList') {
      // 找到并修改数组中的当前元素
      const newLearningList = learningList.map((item, index) => {
        if (index === idnex) {
          return { ...item, showIcon: true };
        }
        return item;
      }
      );
      setLearningList(newLearningList);
    }
    if (belong === 'completeList') {
      // 找到并修改数组中的当前元素
      const newCompleteList = completeList.map((item, index) => {
        if (index === idnex) {
          return { ...item, showIcon: true };
        }
        return item;
      }
      );
      setCompleteList(newCompleteList);
    }
  }

  // 鼠标移出 隐藏 删除按钮
  function deleteIconHide({ belong, showIcon, id }, idnex) {
    if (belong === 'inputList') {
      // 找到并修改数组中的当前元素
      const newInputList = inputList.map((item, index) => {
        if (index === idnex) {
          return { ...item, showIcon: false };
        }
        return item;
      }
      );
      setinputList(newInputList);
    }
    if (belong === 'learningList') {
      // 找到并修改数组中的当前元素
      const newLearningList = learningList.map((item, index) => {
        if (index === idnex) {
          return { ...item, showIcon: false };
        }
        return item;
      }
      );
      setLearningList(newLearningList);
    }
    if (belong === 'completeList') {
      // 找到并修改数组中的当前元素
      const newCompleteList = completeList.map((item, index) => {
        if (index === idnex) {
          return { ...item, showIcon: false };
        }
        return item;
      }
      );
      setCompleteList(newCompleteList);
    }
  }

  // 删除输入框
  function deleteInput({ id, text, belong }, index) {
    if (belong === 'inputList') {
      let cloneInput = [...inputList];
      cloneInput.splice(index, 1);
      setinputList(cloneInput);
    } else if (belong === 'learningList') {
      let cloneLearning = [...learningList];
      cloneLearning.splice(index, 1);
      setLearningList(cloneLearning);
    } else if (belong === 'completeList') {
      let cloneComplete = [...completeList];
      cloneComplete.splice(index, 1);
      setCompleteList(cloneComplete);
    }

  }

  // 在元素被拖动时触发
  let handleDrag = (e, item) => {
    // debugger
    dropId = item.id;  // 记录拖拽的id
    dragBelong = item.belong;  // 记录拖拽的belong
  }

  // 拖拽结束
  let handleDrop = (e, belong) => {
    // debugger
    //拖到这里松手, 更新元素
    // dragBelong 从哪个数组来
    if (dragBelong === 'inputList') {
      //删掉原来的
      let subList = inputList.filter(item => item.id !== dropId);
      setinputList(subList);
      if (belong === 'learningList') {
        //去learningList
        let dropItem = inputList.find(item => item.id === dropId);
        dropItem.belong = 'learningList';
        setLearningList([...learningList, dropItem]);
      }
      else if (belong === 'completeList') {
        //去completeList
        let dropItem = inputList.find(item => item.id === dropId);
        dropItem.belong = 'completeList';
        setCompleteList([...completeList, dropItem]);
      }
    }
    else if (dragBelong === 'learningList') {
      //删掉原来的
      let subList = learningList.filter(item => item.id !== dropId);
      setLearningList(subList);

      //去completeList
      let dropItem = learningList.find(item => item.id === dropId);
      dropItem.belong = 'completeList';
      setCompleteList([...completeList, dropItem]);

    }

    // 恢复外包裹的框子的样式
    setShowBorder('')
  }

  // 在可拖动元素正在拖动到放置目标时触发
  let handelTargetDragOver = (e) => {
    e.preventDefault()
    console.log("移动进来了");

    // 改变外面包裹的框子的 样式
    const str = e.target.className;
    if (str.includes('complete-content')) {
      setShowBorder('completeBorderShow');
    }
    if (str.includes('learning-content')) {
      setShowBorder('learningBorderShow');
    }

  }

  // 在可拖动的元素移出放置目标时执触发
  let handelDrapLeave = (e) => {
    console.log('拖动离开：', e);

  }

  return (
    <div className='main'>
      <div className='container'>
        <div className='study'>
          <div className='study-title'>Prepare to study</div>
          <div className='study-content' onDragLeave={(e) => { handelDrapLeave(e) }}>
            <div className='study-content-item' ref={inputBox}>
              {
                inputList.map((item, index) => {
                  return <div draggable="true" key={item.id} onDragLeave={(e) => { e.stopPropagation() }} onDrag={(e) => { handleDrag(e, item) }} onMouseEnter={() => { deleteIconShow(item, index) }} onMouseLeave={() => { deleteIconHide(item, index) }} onMouseUp={() => { deleteIconHide(item, index) }} style={{ position: 'relative', margin: '10px' }}>
                    <div className={item.showIcon ? 'deleteIconStyle isShow' : 'deleteIconStyle isHide'} onClick={() => { deleteInput(item, index) }}>x</div>
                    <input onChange={(e) => { handleInoutChange(e, item.id) }} defaultValue={item.text} />
                  </div>

                })
              }
            </div>
            <div className='add-study' onClick={add}>+</div>
          </div>
        </div>
        <div className='learning'>
          <div className='learning-title'>Learning...</div>
          <div className={showBorder === 'learningBorderShow' ? 'learning-content showBorder' : 'learning-content hideBorder'} id='jll' onDragOver={(e) => { handelTargetDragOver(e) }} onDrop={(e) => { handleDrop(e, 'learningList') }}>
            <div className='study-content-item' ref={inputBox}>
              {
                learningList.map((item, index) => {
                  return <div draggable="true" key={item.id} onDragLeave={(e) => { e.stopPropagation() }} onDrag={(e) => { handleDrag(e, item) }} onMouseEnter={() => { deleteIconShow(item, index) }} onMouseLeave={() => { deleteIconHide(item, index) }} onMouseUp={() => { deleteIconHide(item, index) }} style={{ position: 'relative', margin: '10px' }} >
                    <div className={item.showIcon ? 'deleteIconStyle isShow' : 'deleteIconStyle isHide'} onClick={() => { deleteInput(item, index) }}>x</div>
                    <input disabled defaultValue={item.text} />
                  </div>

                })
              }
            </div>
          </div>
        </div>
        <div className='complete'>
          <div className='complete-title'>Complete</div>
          <div className={showBorder === 'completeBorderShow' ? 'complete-content showBorder' : 'complete-content hideBorder'} onDragOver={(e) => { handelTargetDragOver(e) }} onDrop={(e) => { handleDrop(e, 'completeList') }}>
            <div className='study-content-item' ref={inputBox}>
              {

                completeList.map((item, index) => {
                  return <div draggable="true" key={item.id} onDragLeave={(e) => { e.stopPropagation() }} onDrag={(e) => { handleDrag(e, item) }} onMouseEnter={() => { deleteIconShow(item, index) }} onMouseLeave={() => { deleteIconHide(item, index) }} onMouseUp={() => { deleteIconHide(item, index) }} style={{ position: 'relative', margin: '10px' }}>
                    <div className={item.showIcon ? 'deleteIconStyle isShow' : 'deleteIconStyle isHide'} onClick={() => { deleteInput(item, index) }}>x</div>
                    <input disabled defaultValue={item.text} />
                  </div>

                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}