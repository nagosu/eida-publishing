/** @jsxImportSource @emotion/react */

import { styles } from "./styles";
import closeIcon from "/assets/images/close_white.svg";
import reportDelete from "/assets/images/report_delete.png";
import downArrowIcon from "/assets/images/down_arrow.png";
import deleteIcon from "/assets/images/closeBtn.svg";
import checkWhite from "/assets/images/check_white.svg";
import { useState } from "react";

// 평가 항목
const evaluations = [
  "타자연습",
  "컴퓨팅 사고력",
  "실기",
  "문제 풀이",
  "수업 태도",
];

// LEVEL(수준)
const levels = [
  "참여횟수 / 정확도 / 시간 / 스스로 세웠던 목표 달성횟수",
  "정해진 시간안에 주어진 문제 안에서 블록응용 / 로직(한문제당 1점)",
  "필수블록포함여부 / 수행도 / 정확성 / 부분점수 없음",
  "이론문제로 지필시험(한문제 당 1점)",
  "지각 및 출석 / 수업참여도(미션수행, 발표) / 집중도",
];

// 잘하고 있을 때
const GOOD = ["잘하고 있을 때", "", "", "", ""];

// 부족한 경우
const BAD = ["", "", "타자를 못 칩니다", "", ""];

// 문제 유형
const OPTIONS = [
  "String (문자열)",
  "Array (배열)",
  "Queue (큐)",
  "Stack (스택)",
  "Hash (해쉬)",
  "Tree (트리)",
];

// 선택한 문제 유형
const dropdownSelect = ["그래프", "최단 경로", "동적프로그래밍"];

const EditPage = () => {
  const [dropdownVisible, setDropdownVisible] = useState(
    Array(evaluations.length).fill(false)
  ); // 평가 항목별로 dropdown이 열려있는지 여부
  const [selectedOptions, setSelectedOptions] = useState(
    Array(evaluations.length).fill({})
  ); // 평가 항목별로 선택한 문제 유형
  const [inputFocusGood, setInputFocusGood] = useState(
    Array(evaluations.length).fill(false)
  ); // 잘하고 있을 때 input focus 여부
  const [inputFocusBad, setInputFocusBad] = useState(
    Array(evaluations.length).fill(false)
  ); // 부족한 경우 input focus 여부
  const [goodInputs, setGoodInputs] = useState(GOOD); // 잘하고 있을 때 input value
  const [badInputs, setBadInputs] = useState(BAD); // 부족한 경우 input value

  // dropdown 클릭 시 dropdown이 열리거나 닫힘
  const handleDropdownClick = (index: number) => {
    const newDropdownVisible = [...dropdownVisible];
    newDropdownVisible[index] = !newDropdownVisible[index];
    setDropdownVisible(newDropdownVisible);
  };

  // 문제 유형 선택 시 선택한 문제 유형에 추가
  const handleOptionSelect = (evalIndex: number, option: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[evalIndex] = {
      ...newSelectedOptions[evalIndex],
      [option]: !newSelectedOptions[evalIndex][option],
    };
    setSelectedOptions(newSelectedOptions);
  };

  // 선택한 문제 유형 삭제
  const handleInputFocus = (index: number, focused: boolean, type: string) => {
    if (type === "good") {
      const newInputFocusGood = [...inputFocusGood];
      newInputFocusGood[index] = focused;
      setInputFocusGood(newInputFocusGood);
    } else {
      const newInputFocusBad = [...inputFocusBad];
      newInputFocusBad[index] = focused;
      setInputFocusBad(newInputFocusBad);
    }
  };

  // input value 변경
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newInputs = [
      ...(setState === setGoodInputs ? goodInputs : badInputs),
    ];
    newInputs[index] = event.target.value;
    setState(newInputs);
  };

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <span css={styles.headerTitle}>보고서 항목 수정</span>
        <button css={styles.closeIcon}>
          <img src={closeIcon} alt='close' />
        </button>
      </div>
      <div css={styles.content}>
        <div css={styles.tableHeader}>
          <div css={styles.headerEvaluation}>
            <span css={styles.tableText}>평가 항목</span>
          </div>
          <div css={styles.headerLevel}>
            <span css={styles.tableText}>LEVLE(수준)</span>
          </div>
          <div css={styles.headerGood}>
            <span css={styles.tableText}>잘하고 있을 때</span>
          </div>
          <div css={styles.headerBad}>
            <span css={styles.tableText}>부족한 경우</span>
          </div>
          <div css={styles.headerType}>
            <span css={styles.tableText}>문제 유형</span>
          </div>
          <div css={styles.headerBlank}></div>
        </div>
        <div css={styles.tableBodyContainer}>
          {evaluations.map((evaluation, index) => (
            <div css={styles.tableBodyRow} key={index}>
              <div css={styles.bodyEvaluation}>
                <span css={styles.tableText}>{evaluation}</span>
              </div>
              <div css={styles.bodyLevel}>
                <span css={styles.tableText}>{levels[index]}</span>
              </div>
              <div css={styles.bodyGood}>
                <input
                  css={styles.bodyInput}
                  type='text'
                  value={goodInputs[index]}
                  placeholder={inputFocusGood[index] ? "잘하고 있을 때" : ""}
                  onFocus={() => handleInputFocus(index, true, "good")}
                  onBlur={() => handleInputFocus(index, false, "good")}
                  onChange={(e) => handleInputChange(index, e, setGoodInputs)}
                />
              </div>
              <div css={styles.bodyBad}>
                <input
                  css={styles.bodyInput}
                  type='text'
                  value={badInputs[index]}
                  placeholder={inputFocusBad[index] ? "부족한 경우" : ""}
                  onFocus={() => handleInputFocus(index, true, "bad")}
                  onBlur={() => handleInputFocus(index, false, "bad")}
                  onChange={(e) => handleInputChange(index, e, setBadInputs)}
                />
              </div>
              <div css={styles.bodyType}>
                <div
                  css={styles.dropdownContainer}
                  onClick={() => handleDropdownClick(index)}
                >
                  <span css={styles.dropdownTitle}>
                    문제 유형을 선택해주세요.
                  </span>
                  <div css={styles.dropdownIconContainer}>
                    <img src={downArrowIcon} alt='' />
                  </div>
                  {dropdownVisible[index] && (
                    <div css={styles.dropdownList}>
                      {OPTIONS.map((option, idx) => (
                        <div
                          key={idx}
                          css={styles.dropdownItem}
                          onClick={() => handleOptionSelect(index, option)}
                        >
                          {selectedOptions[index][option] ? (
                            <div css={styles.dropdownSelectIconSelected}>
                              <img src={checkWhite} alt='' />
                            </div>
                          ) : (
                            <div css={styles.dropdownSelectIcon}></div>
                          )}
                          <span css={styles.dropdownItemText}>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div css={styles.dropdownSelected}>
                  {dropdownSelect.map((select, idx) => (
                    <div css={styles.dropdownSelectContainer} key={idx}>
                      <span css={styles.dropdownSelectTitle}>{select}</span>
                      <div css={styles.dropdownDeleteContainer}>
                        <img src={deleteIcon} alt='' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div css={styles.bodyDelete}>
                <div css={styles.deleteContainer}>
                  <img src={reportDelete} alt='' />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button css={styles.addTable}>
          <span css={styles.addTableText}>+ 평가항목 추가하기</span>
        </button>
      </div>
    </div>
  );
};

export default EditPage;
