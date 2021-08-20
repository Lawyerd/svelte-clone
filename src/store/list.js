import { writable } from "svelte/store";
import cryptoRandomString from "crypto-random-string";
import _find from "lodash/find";
import _remove from "lodash/remove";

const crypto = () => {
  return cryptoRandomString({ length: 10 });
};

const repoLists = JSON.parse(window.localStorage.getItem("lists")) || [];
// 이렇게 가져오는 데이터는 객체데이터가 아니라 문자 데이터이다.
// 따라서 parsing해주어야 한다.

const _lists = writable(repoLists);
// _를 붙이는 이유, js파일 내부에서만 사용할 것이라서
_lists.subscribe($lists => {
  // subscribe하면 값(_lists)이 변할 때마다 동작함
  window.localStorage.setItem("lists", JSON.stringify($lists));
  // setItem(데이터의 이름, 데이터의 값)
  // localStroage에는 문자 데이터만 저장 가능, 객체를 문자로 바꾼다.
});

export const lists = {
  // 밖으로 내보낼 용도의 커스텀 storage를 만들거야
  // 하지만 실제로 사용하는 데이터는 _lists라는 store이지
  subscribe: _lists.subscribe, // 메소드를 실행하지 않고 메소드 자체를 할당
  // add: function() {}

  add(payload) {
    // 내가 만든 별도의 메소드
    const { title } = payload;
    _lists.update($lists => {
      $lists.push({
        id: crypto(),
        title,
        cards: [],
      });
      return $lists;
      // 반환함으로써 $lists를 update한다.
    });
  },

  edit(payload) {
    const { listId, title } = payload;
    _lists.update($lists => {
      // let foundList = $lists.find(l => {
      //   return l.id === listId;
      // });
      // lodash라는 모듈을 사용해서 좀 더 간단하게 만들어주자
      const foundList = _find($lists, { id: listId });
      foundList.title = title;
      return $lists;
    });
  },

  remove(payload) {
    const { listId } = payload;
    _lists.update($lists => {
      // const filteredList = $lists.filter(el => {
      //   return el.id !== listId;
      // });

      // return filteredList;
      _remove($lists, { id: listId });
      return $lists;
    });
  },
};
