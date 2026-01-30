import React, { useEffect, useState } from "react";
import { Modal} from "antd";
import ResultCard from "./ResultCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import  { BsTrophyFill } from 'react-icons/bs';

const DemoResult = ({ visible, handleClose, data }) => {

  const [resultCard, setResultCard] = useState('')
  const [resultDesc, setResultDesc] = useState('')
  const [groupedCards, setGroupedCards] = useState({});

  useEffect(() => {
    handleResponseCasino(data);
  }, [data])

  const handleResponseCasino = (data) => {

    if (data && data.gtype === "teen20") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "queen") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "race20") {
      const groupedCards = { 'H': [], 'D': [], 'C': [], 'S': [] };
      let spliceData = data && data.cards ? data.cards.split(",") : [];
      spliceData?.map((data) => {
        const cardType1 = { 'H': 'H', 'D': 'D', 'S': 'S', 'C': 'C' };
        const value = data.slice(1, 2);
        const cardType = cardType1[value];
        if (cardType === "H") {
          groupedCards['H'].push(data);
        } else if (cardType === "C") {
          groupedCards['C'].push(data);
        } else if (cardType === "D") {
          groupedCards['D'].push(data);
        } else if (cardType === "S") {
          groupedCards['S'].push(data);
        } return groupedCards;
      });
      setGroupedCards(groupedCards);
    } else if (data && data.gtype === "abj") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "ab20") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "worli2") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "worli") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "superover") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "teen8") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "Teen") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "teen9") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "card32eu") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "card32") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "aaa") {
      let resultDesc = data && data.desc ? data.desc.split('|') : []
      setResultDesc(resultDesc);
    } else if (data && data.gtype === "dt20") {
      let resultDesc = data && data.desc ? data.desc.split('*') : []
      setResultDesc(resultDesc);
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "dt202") {
      let resultDesc = data && data.desc ? data.desc.split('*') : []
      setResultDesc(resultDesc);
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "dt6") {
      let resultDesc = data && data.desc ? data.desc.split('*') : []
      setResultDesc(resultDesc);
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "poker20") {
      let resultDesc = data && data.desc ? data.desc.split('##') : []
      setResultDesc(resultDesc);
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "poker") {
      let resultDesc = data && data.desc ? data.desc.split('##') : []
      setResultDesc(resultDesc);
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "War") {
      let resultDesc = data.sid ? data.sid.split(',') : []
      setResultDesc(resultDesc);
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "baccarat") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "baccarat2") {
      let resultCard = data && data.cards !== "" ? data.cards.split(',') : []
      setResultCard(resultCard);
    } else if (data && data.gtype === "cmeter") {
      const groupedCards = { '1-9': [], '10-K': [] };
      let spliceData = data && data.cards !== "" ? data.cards.split(',') : [];
      if (spliceData.length > 0) {
        spliceData?.map((data) => {
          const number = {
            '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
            '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
            'J': '11', 'Q': '12', 'K': '13', 'A': '1'
          };
          const value = data.slice(0, -2);
          const numericValue = number[value];
          if (numericValue >= 1 && numericValue <= 9) {
            groupedCards['1-9'].push(data);
          } else if (numericValue >= 10 && numericValue <= 13) {
            groupedCards['10-K'].push(data);
          } return groupedCards;
        });
        setGroupedCards(groupedCards);
      }
    }
  }


  var settings2 = {
    dots: false,
    infinite: true,
    speed: 20,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  var settings3 = {
    dots: false,
    infinite: true,
    speed: 20,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  if (!data || !visible) {
    return null;
  }

  const modalFooter = null;

  return (
    <Modal
      title={`PARTNERSHIP DETAILS -`}
      onCancel={handleClose}
      open={true}
      footer={modalFooter}
      className="gx-px-3"
    >
      <div className="absolute top-0 left-0 w-full min-h-full z-50 flex gx-justify-content-center gx-align-items-center bg-black/30 px-3">
        <div className="w-full lg:min-w-[43%] lg:max-w-fit bg-white z-50 mx-auto top-4">

          <div className='p-3'>
            {data?.gtype === "teen20" ?
              <div className=''>
                <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                  <p className='gx-fs-xl gx-font-bold'>Player A</p>
                  <div className='gx-bg-flex space-x-2 py-2'>
                    <ResultCard num={resultCard[0]} />
                    <ResultCard num={resultCard[1]} />
                    <ResultCard num={resultCard[2]} />
                  </div>
                </div>
                {data.win === "1" ?
                  <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                    <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                  </div> : null
                }
                <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                  <p className='gx-fs-xl gx-font-bold'>Player B</p>
                  <div className='gx-bg-flex space-x-2 py-2'>
                    <ResultCard num={resultCard[3]} />
                    <ResultCard num={resultCard[4]} />
                    <ResultCard num={resultCard[5]} />
                  </div>
                </div>
                {data.win === "3" ?
                  <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                    <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                  </div> : null
                }
              </div>

              : data.gtype === "teen9" ?
                <div className=''>
                  <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                    <p className='gx-fs-xl gx-font-bold'>Tiger</p>
                    <div className='gx-bg-flex space-x-2 py-2'>
                      <ResultCard num={resultCard[0]} />
                      <ResultCard num={resultCard[3]} />
                      <ResultCard num={resultCard[6]} />
                    </div>
                  </div>
                  {data.win === "11" ?
                    <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                      <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                    </div> : null
                  }
                  <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                    <p className='gx-fs-xl gx-font-bold'>Lion</p>
                    <div className='gx-bg-flex space-x-2 py-2'>
                      <ResultCard num={resultCard[1]} />
                      <ResultCard num={resultCard[4]} />
                      <ResultCard num={resultCard[7]} />
                    </div>
                  </div>
                  {data.win === "21" ?
                    <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                      <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                    </div> : null
                  }
                  <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                    <p className='gx-fs-xl gx-font-bold'>Dragon</p>
                    <div className='gx-bg-flex space-x-2 py-2'>
                      <ResultCard num={resultCard[2]} />
                      <ResultCard num={resultCard[5]} />
                      <ResultCard num={resultCard[8]} />
                    </div>
                  </div>
                  {data.win === "31" ?
                    <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                      <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                    </div> : null
                  }
                </div>
                : data.gtype === "queen" ?
                  <div className='space-y-4'>
                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                      <p className='gx-fs-xl gx-font-bold'>Total 0</p>
                      <div className='gx-bg-flex space-x-2'>
                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                        {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                      </div>
                    </div>
                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                      <p className='gx-fs-xl gx-font-bold'>Total 1</p>
                      <div className='gx-bg-flex space-x-2'>
                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                        {resultCard[6] === "1" ? null : <ResultCard num={resultCard[6]} />}
                      </div>
                    </div>
                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                      <p className='gx-fs-xl gx-font-bold'>Total 2</p>
                      <div className='gx-bg-flex space-x-2'>
                        {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                        {resultCard[7] === "1" ? null : <ResultCard num={resultCard[7]} />}
                      </div>
                    </div>
                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                      <p className='gx-fs-xl gx-font-bold'>Total 3</p>
                      <div className='gx-bg-flex space-x-2'>
                        {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                        {resultCard[8] === "1" ? null : <ResultCard num={resultCard[8]} />}
                      </div>
                    </div>
                    <div className='gx-bg-flex items-end justify-end px-2'>
                      <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                    </div>
                  </div>
                  : data.gtype === "race20" ?
                    <div>
                      <div className='gx-bg-flex gx-align-items-center lg:space-x-5 space-x-3 px-2'>
                        <div className='gx-bg-flex gx-flex-column space-y-3 px-3'>
                          <div className='gx-bg-flex gx-align-items-center space-x-2'>
                            <img src="/images/spade-race.png" alt="spade-race" className='w-10' />
                            {groupedCards['H']?.map((card, index) => (
                              <ResultCard num={card} />
                            ))}
                          </div>
                          <div className='gx-bg-flex gx-align-items-center space-x-2'>
                            <img src="/images/heart-race.png" alt="spade-race" className='w-10' />
                            {groupedCards['D']?.map((card, index) => (
                              <ResultCard num={card} />
                            ))}
                          </div>
                          <div className='gx-bg-flex gx-align-items-center space-x-2'>
                            <img src="/images/club-race.png" alt="spade-race" className='w-10' />
                            {groupedCards['C']?.map((card, index) => (
                              <ResultCard num={card} />
                            ))}
                          </div>
                          <div className='gx-bg-flex gx-align-items-center space-x-2'>
                            <img src="/images/diamond-race.png" alt="spade-race" className='w-10' />
                            {groupedCards['S']?.map((card, index) => (
                              <ResultCard num={card} />
                            ))}
                          </div>
                        </div>
                        <div className='gx-bg-flex lg:space-x-2 space-x-1'>
                          <div className=' bg-[#EFEDED] border border-[#FFFF00] px-3 py-1 text-center text-4xl'>
                            <p>W</p>
                            <p>I</p>
                            <p>N</p>
                            <p>N</p>
                            <p>E</p>
                            <p>R</p>
                          </div>
                          <div className='gx-bg-flex gx-flex-column'>
                            {data.win === "1" ?
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center space-x-2'>
                                <img src="/cards/KHH.png" alt="" className="h-14 w-11" />
                                <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div> :
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center h-full'>
                                <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div>
                            }
                            {data.win === "2" ?
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center space-x-2'>
                                <img src="/cards/KDD.png" alt="" className="h-14 w-11" />
                                <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div> :
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center h-full'>
                                <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div>
                            }
                            {data.win === "3" ?
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center space-x-2'>
                                <img src="/cards/KCC.png" alt="" className="h-14 w-11" />
                                <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div> :
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center h-full'>
                                <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div>
                            }
                            {data.win === "4" ?
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center space-x-2'>
                                <img src="/cards/KSS.png" alt="" className="h-14 w-11" />
                                <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div> :
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center h-full'>
                                <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                      <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 text-base'>
                        <p className='font-medium text-green-500'>Result: <span className='text-black'>{data.desc}</span> </p>
                      </div>
                    </div>
                    : data.gtype === "btable" ?
                      <div>
                        <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                          <img src={`/cards/${data && data.cards ? data.cards : null}.png`} alt="card" className="h-14 w-11" />
                        </div>
                        <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 text-base'>
                          <p className='font-medium text-green-400'>Result: <span className='text-black'>{resultDesc[0]}</span> </p>
                        </div>
                        <div className='gx-bg-flex gx-justify-content-center gx-align-items-center py-1 pb-2 '>
                          <span className='text-black'>{resultDesc[1]} | {resultDesc[2]} | {resultDesc[3]} | {resultDesc[4]}</span>
                        </div>
                      </div> : data.gtype === "abj" ?
                        <div className="space-y-2">
                          <div className="">
                            <div className=" flex gx-justify-content-center gx-align-items-center font-bold text-[16px] w-full" >
                              Andar
                            </div>
                            <div className=" flex gx-justify-content-center gx-align-items-center py-4">
                              <Slider {...settings2} className="w-[350px] ">
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[0] === "1" ? null : <><ResultCard num={resultCard[0]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[2] === "1" ? null : <><ResultCard num={resultCard[2]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[4] === "1" ? null : <><ResultCard num={resultCard[4]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[6] === "1" ? null : <><ResultCard num={resultCard[6]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[8] === "1" ? null : <><ResultCard num={resultCard[8]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[10] === "1" ? null : <><ResultCard num={resultCard[10]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[12] === "1" ? null : <><ResultCard num={resultCard[12]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[14] === "1" ? null : <><ResultCard num={resultCard[14]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[16] === "1" ? null : <><ResultCard num={resultCard[16]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[18] === "1" ? null : <><ResultCard num={resultCard[18]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[20] === "1" ? null : <><ResultCard num={resultCard[20]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[22] === "1" ? null : <><ResultCard num={resultCard[22]} /><p>0</p></>}
                                </div>
                              </Slider>
                            </div>
                          </div>
                          <div className="">
                            <div className="flex gx-justify-content-center gx-align-items-center font-bold text-[16px] " >
                              Bahar
                            </div>
                            <div className=" flex gx-justify-content-center gx-align-items-center py-4">
                              <Slider {...settings3} className="w-[350px] ">
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[1] === "1" ? null : <><ResultCard num={resultCard[1]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[3] === "1" ? null : <><ResultCard num={resultCard[3]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[5] === "1" ? null : <><ResultCard num={resultCard[5]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[7] === "1" ? null : <><ResultCard num={resultCard[7]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[9] === "1" ? null : <><ResultCard num={resultCard[9]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[11] === "1" ? null : <><ResultCard num={resultCard[11]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[13] === "1" ? null : <><ResultCard num={resultCard[13]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[15] === "1" ? null : <><ResultCard num={resultCard[15]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[17] === "1" ? null : <><ResultCard num={resultCard[17]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[19] === "1" ? null : <><ResultCard num={resultCard[19]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[21] === "1" ? null : <><ResultCard num={resultCard[21]} /><p>0</p></>}
                                </div>
                                <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                  {resultCard[23] === "1" ? null : <><ResultCard num={resultCard[23]} /><p>0</p></>}
                                </div>
                              </Slider>
                            </div>
                          </div>

                        </div> : data.gtype === "ab20" ?
                          <div className="space-y-2">
                            <div className="">
                              <div className=" flex gx-justify-content-center gx-align-items-center font-bold text-[16px] w-full" >
                                Andar
                              </div>
                              <div className=" flex gx-justify-content-center gx-align-items-center py-4">
                                <Slider {...settings2} className="w-[350px] ">
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[0] === "1" ? null : <><ResultCard num={resultCard[0]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[2] === "1" ? null : <><ResultCard num={resultCard[2]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[4] === "1" ? null : <><ResultCard num={resultCard[4]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[6] === "1" ? null : <><ResultCard num={resultCard[6]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[8] === "1" ? null : <><ResultCard num={resultCard[8]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[10] === "1" ? null : <><ResultCard num={resultCard[10]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[12] === "1" ? null : <><ResultCard num={resultCard[12]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[14] === "1" ? null : <><ResultCard num={resultCard[14]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[16] === "1" ? null : <><ResultCard num={resultCard[16]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[18] === "1" ? null : <><ResultCard num={resultCard[18]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[20] === "1" ? null : <><ResultCard num={resultCard[20]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[22] === "1" ? null : <><ResultCard num={resultCard[22]} /><p>0</p></>}
                                  </div>
                                </Slider>
                              </div>
                            </div>
                            <div className="">
                              <div className="flex gx-justify-content-center gx-align-items-center font-bold text-[16px] " >
                                Bahar
                              </div>
                              <div className=" flex gx-justify-content-center gx-align-items-center py-4">
                                <Slider {...settings3} className="w-[350px] ">
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[1] === "1" ? null : <><ResultCard num={resultCard[1]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[3] === "1" ? null : <><ResultCard num={resultCard[3]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[5] === "1" ? null : <><ResultCard num={resultCard[5]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[7] === "1" ? null : <><ResultCard num={resultCard[7]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[9] === "1" ? null : <><ResultCard num={resultCard[9]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[11] === "1" ? null : <><ResultCard num={resultCard[11]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[13] === "1" ? null : <><ResultCard num={resultCard[13]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[15] === "1" ? null : <><ResultCard num={resultCard[15]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[17] === "1" ? null : <><ResultCard num={resultCard[17]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[19] === "1" ? null : <><ResultCard num={resultCard[19]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[21] === "1" ? null : <><ResultCard num={resultCard[21]} /><p>0</p></>}
                                  </div>
                                  <div className="w-full gx-justify-content-center gx-flex-column flex gx-align-items-center px-1 text-center">
                                    {resultCard[23] === "1" ? null : <><ResultCard num={resultCard[23]} /><p>0</p></>}
                                  </div>
                                </Slider>
                              </div>
                            </div>

                          </div> : data.gtype === "worli2" ?
                            <div>
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center space-x-2'>
                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                              </div>
                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base py-2'>
                                <span className='bg-[#169733] text-white px-6'>{data.sid}-{data.win}</span>
                              </div>
                            </div> : data.gtype === "worli" ?
                              <div>
                                <div className='gx-bg-flex gx-justify-content-center gx-align-items-center space-x-2'>
                                  {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                  {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                  {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                </div>
                                <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base py-2'>
                                  <span className='bg-[#169733] text-white px-6'>{data.sid}-{data.win}</span>
                                </div>
                              </div> : data.gtype === "superover" ?
                                <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base'>
                                  <h1 className='text-center'>Result not available</h1>
                                </div> : data.gtype === "teen8" ?
                                  <div className=''>
                                    <div className='lg:hidden block'>
                                      <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                        <p className='gx-fs-xl gx-font-bold'>Dealer</p>
                                        <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                          {resultCard[8] === "1" ? null : <ResultCard num={resultCard[8]} />}
                                          {resultCard[17] === "1" ? null : <ResultCard num={resultCard[17]} />}
                                          {resultCard[26] === "1" ? null : <ResultCard num={resultCard[26]} />}
                                        </div>
                                      </div>
                                      <div className='py-6'>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 1</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                            {resultCard[9] === "1" ? null : <ResultCard num={resultCard[9]} />}
                                            {resultCard[18] === "1" ? null : <ResultCard num={resultCard[18]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 2</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                            {resultCard[10] === "1" ? null : <ResultCard num={resultCard[10]} />}
                                            {resultCard[19] === "1" ? null : <ResultCard num={resultCard[19]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 3</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            {resultCard[11] === "1" ? null : <ResultCard num={resultCard[11]} />}
                                            {resultCard[20] === "1" ? null : <ResultCard num={resultCard[20]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 4</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                            {resultCard[12] === "1" ? null : <ResultCard num={resultCard[12]} />}
                                            {resultCard[21] === "1" ? null : <ResultCard num={resultCard[21]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 5</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                            {resultCard[13] === "1" ? null : <ResultCard num={resultCard[13]} />}
                                            {resultCard[22] === "1" ? null : <ResultCard num={resultCard[22]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 6</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                            {resultCard[14] === "1" ? null : <ResultCard num={resultCard[14]} />}
                                            {resultCard[23] === "1" ? null : <ResultCard num={resultCard[23]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 7</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[6] === "1" ? null : <ResultCard num={resultCard[6]} />}
                                            {resultCard[15] === "1" ? null : <ResultCard num={resultCard[15]} />}
                                            {resultCard[24] === "1" ? null : <ResultCard num={resultCard[24]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex gx-flex-column gx-align-items-center">
                                          <p className='gx-fs-xl gx-font-bold'>Player 8</p>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                            {resultCard[7] === "1" ? null : <ResultCard num={resultCard[7]} />}
                                            {resultCard[16] === "1" ? null : <ResultCard num={resultCard[16]} />}
                                            {resultCard[25] === "1" ? null : <ResultCard num={resultCard[25]} />}
                                          </div>
                                          <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='lg:block hidden'>
                                      <div className='gx-bg-flex space-x-1'>
                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                          <div className="text-center flex gx-flex-column gx-align-items-center">
                                            <p className='gx-fs-xl gx-font-bold'>Player 1</p>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                              {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                              {resultCard[9] === "1" ? null : <ResultCard num={resultCard[9]} />}
                                              {resultCard[18] === "1" ? null : <ResultCard num={resultCard[18]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div>
                                          <div className="text-center flex gx-flex-column gx-align-items-center">
                                            <p className='gx-fs-xl gx-font-bold'>Player 2</p>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                              {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                              {resultCard[10] === "1" ? null : <ResultCard num={resultCard[10]} />}
                                              {resultCard[19] === "1" ? null : <ResultCard num={resultCard[19]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div>
                                          <div className="text-center flex gx-flex-column gx-align-items-center">
                                            <p className='gx-fs-xl gx-font-bold'>Player 3</p>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                              {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                              {resultCard[11] === "1" ? null : <ResultCard num={resultCard[11]} />}
                                              {resultCard[20] === "1" ? null : <ResultCard num={resultCard[20]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div>
                                        </div>
                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-between gx-align-items-center'>
                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                            <p className='gx-fs-xl gx-font-bold'>Dealer</p>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                              {resultCard[8] === "1" ? null : <ResultCard num={resultCard[8]} />}
                                              {resultCard[17] === "1" ? null : <ResultCard num={resultCard[17]} />}
                                              {resultCard[26] === "1" ? null : <ResultCard num={resultCard[26]} />}
                                            </div>
                                          </div>
                                          <div className='gx-bg-flex'>
                                            <div className="text-center flex gx-flex-column gx-align-items-center">
                                              <p className='gx-fs-xl gx-font-bold'>Player 4</p>
                                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                                {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                {resultCard[12] === "1" ? null : <ResultCard num={resultCard[12]} />}
                                                {resultCard[21] === "1" ? null : <ResultCard num={resultCard[21]} />}
                                              </div>
                                              <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                            </div>
                                            <div className="text-center flex gx-flex-column gx-align-items-center">
                                              <p className='gx-fs-xl gx-font-bold'>Player 5</p>
                                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                                {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                {resultCard[13] === "1" ? null : <ResultCard num={resultCard[13]} />}
                                                {resultCard[22] === "1" ? null : <ResultCard num={resultCard[22]} />}
                                              </div>
                                              <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                          <div className="text-center flex gx-flex-column gx-align-items-center">
                                            <p className='gx-fs-xl gx-font-bold'>Player 8</p>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                              {resultCard[7] === "1" ? null : <ResultCard num={resultCard[7]} />}
                                              {resultCard[16] === "1" ? null : <ResultCard num={resultCard[16]} />}
                                              {resultCard[25] === "1" ? null : <ResultCard num={resultCard[25]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div>
                                          <div className="text-center flex gx-flex-column gx-align-items-center">
                                            <p className='gx-fs-xl gx-font-bold'>Player 7</p>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                              {resultCard[6] === "1" ? null : <ResultCard num={resultCard[6]} />}
                                              {resultCard[15] === "1" ? null : <ResultCard num={resultCard[15]} />}
                                              {resultCard[24] === "1" ? null : <ResultCard num={resultCard[24]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div>
                                          <div className="text-center flex gx-flex-column gx-align-items-center">
                                            <p className='gx-fs-xl gx-font-bold'>Player 6</p>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center w-full space-x-1'>
                                              {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                              {resultCard[14] === "1" ? null : <ResultCard num={resultCard[14]} />}
                                              {resultCard[23] === "1" ? null : <ResultCard num={resultCard[23]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div> : data.gtype === "card32eu" ?
                                    <div className='space-y-4'>
                                      <div className='grid grid-cols-3'>
                                        <div className=''>
                                        </div>
                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                          <p className='gx-fs-xl gx-font-bold'>Player 8</p>
                                          {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                        </div>
                                        {data.win === "1" ?
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center'>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div> : null
                                        }
                                      </div>
                                      <div className='grid grid-cols-3'>
                                        <div className=''>
                                        </div>
                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                          <p className='gx-fs-xl gx-font-bold'>Player 9</p>
                                          {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                        </div>
                                        {data.win === "2" ?
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center'>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div> : null
                                        }
                                      </div>
                                      <div className='grid grid-cols-3'>
                                        <div className=''>
                                        </div>
                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                          <p className='gx-fs-xl gx-font-bold'>Player 10</p>
                                          {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                        </div>
                                        {data.win === "3" ?
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center'>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div> : null
                                        }
                                      </div>
                                      <div className='grid grid-cols-3'>
                                        <div className=''>
                                        </div>
                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                          <p className='gx-fs-xl gx-font-bold'>Player 11</p>
                                          {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                        </div>
                                        {data.win === "4" ?
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center'>
                                            <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                          </div> : null
                                        }
                                      </div>
                                    </div> : data.gtype === "card32" ?
                                      <div className='space-y-4'>
                                        <div className='grid grid-cols-3'>
                                          <div className=''>
                                          </div>
                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                            <p className='gx-fs-xl gx-font-bold'>Player 8</p>
                                            {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                          </div>
                                          {data.win === "1" ?
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                              <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                          }
                                        </div>
                                        <div className='grid grid-cols-3'>
                                          <div className=''>
                                          </div>
                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                            <p className='gx-fs-xl gx-font-bold'>Player 9</p>
                                            {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                          </div>
                                          {data.win === "2" ?
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                              <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                          }
                                        </div>
                                        <div className='grid grid-cols-3'>
                                          <div className=''>
                                          </div>
                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                            <p className='gx-fs-xl gx-font-bold'>Player 10</p>
                                            {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                          </div>
                                          {data.win === "3" ?
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                              <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                          }
                                        </div>
                                        <div className='grid grid-cols-3'>
                                          <div className=''>
                                          </div>
                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                            <p className='gx-fs-xl gx-font-bold'>Player 11</p>
                                            {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                          </div>
                                          {data.win === "4" ?
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                              <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                          }
                                        </div>
                                      </div> : data.gtype === "aaa" ?
                                        <div>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                            {data.cards === "1" ? null : <ResultCard num={data.cards} />}
                                          </div>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 text-base'>
                                            <p className='font-medium text-green-400'>Result: <span className='text-black'>{resultDesc[0]}</span> </p>
                                          </div>
                                          <div className='gx-bg-flex gx-justify-content-center gx-align-items-center py-1 pb-2 '>
                                            <span className='text-black'>{resultDesc[1]} | {resultDesc[2]} | {resultDesc[3]} | {resultDesc[4]}</span>
                                          </div>
                                        </div> : data.gtype === "lucky7" ?
                                          <div>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                              {data.cards === "1" ? null : <ResultCard num={data.cards} />}
                                            </div>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 text-base'>
                                              <p className='font-medium text-green-400'>Result: <span className='text-black'>{data.desc}</span> </p>
                                            </div>
                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center py-1 pb-2 '>

                                            </div>
                                          </div> : data.gtype === "lucky7eu" ?
                                            <div>
                                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                                {data.cards === "1" ? null : <ResultCard num={data.cards} />}
                                              </div>
                                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 text-base'>
                                                <p className='font-medium text-green-400'>Result: <span className='text-black'>{data.desc}</span> </p>
                                              </div>
                                              <div className='gx-bg-flex gx-justify-content-center gx-align-items-center py-1 pb-2 '>

                                              </div>
                                            </div> : data.gtype === "dt20" ?
                                              <div div className='lg:block hidden'>
                                                <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2'>
                                                  <div className="flex gx-align-items-center space-x-2">
                                                    {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                    {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                  </div>
                                                  <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                                    <p className='text-base font-medium text-green-500'>Result:<span className='text-black'>{resultDesc[0]}</span></p>
                                                    <p className='text-base font-medium text-green-500'>Dragon:<span className='text-black'>{resultDesc[1]}</span></p>
                                                    <p className='text-base font-medium text-green-500'>Tiger:<span className='text-black'>{resultDesc[2]}</span></p>
                                                  </div>
                                                </div>
                                              </div> : data.gtype === "dt6" ?
                                                <div div className='lg:block hidden'>
                                                  <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2'>
                                                    <div className="flex gx-align-items-center space-x-2">
                                                      {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                      {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                    </div>
                                                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                                      <p className='text-base font-medium text-green-500'>Result:<span className='text-black'>{resultDesc[0]}</span></p>
                                                      <p className='text-base font-medium text-green-500'>Dragon:<span className='text-black'>{resultDesc[1]}</span></p>
                                                      <p className='text-base font-medium text-green-500'>Tiger:<span className='text-black'>{resultDesc[2]}</span></p>
                                                    </div>
                                                  </div>
                                                </div> : data.gtype === "dt202" ?
                                                  <div div className='lg:block hidden'>
                                                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2'>
                                                      <div className="flex gx-align-items-center space-x-2">
                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                      </div>
                                                      <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                                        <p className='text-base font-medium text-green-500'>Result:<span className='text-black'>{resultDesc[0]}</span></p>
                                                        <p className='text-base font-medium text-green-500'>Dragon:<span className='text-black'>{resultDesc[1]}</span></p>
                                                        <p className='text-base font-medium text-green-500'>Tiger:<span className='text-black'>{resultDesc[2]}</span></p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  : data.gtype === "poker20" ?
                                                    <div className='lg:block hidden'>
                                                      <div className='grid grid-cols-2 w-full'>
                                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2 border-r py-2'>
                                                          <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                          <div className='gx-bg-flex space-x-2 py-2'>
                                                            <ResultCard num={resultCard[0]} />
                                                            <ResultCard num={resultCard[1]} />
                                                          </div>
                                                          {data.win === "11" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> :
                                                            <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>}
                                                        </div>
                                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2 border-r py-2'>
                                                          <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                          <div className='gx-bg-flex space-x-2 py-2'>
                                                            <ResultCard num={resultCard[2]} />
                                                            <ResultCard num={resultCard[3]} />
                                                          </div>
                                                          {data.win === "21" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> :
                                                            <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>}
                                                        </div>

                                                        <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2 col-span-2 border-t border-b p-4'>
                                                          <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                          <div className='gx-bg-flex space-x-2 py-2'>
                                                            <ResultCard num={resultCard[4]} />
                                                            <ResultCard num={resultCard[5]} />
                                                            <ResultCard num={resultCard[6]} />
                                                            <ResultCard num={resultCard[7]} />
                                                            <ResultCard num={resultCard[8]} />
                                                          </div>
                                                        </div>
                                                        <div className='space-y-1 border-t border-b p-2'>
                                                          <p className='text-base gx-font-bold text-[#169733]'>Winner:<span className='text-black'>{resultDesc[0]}</span></p>
                                                          <p className='text-base gx-font-bold text-yellow-400'>Player {resultDesc[1]}</p>
                                                        </div>
                                                      </div>
                                                    </div> : data.gtype === "poker" ?
                                                      <div className='lg:block hidden'>
                                                        <div className='grid grid-cols-2 w-full'>
                                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2 border-r py-2'>
                                                            <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                            <div className='gx-bg-flex space-x-2 py-2'>
                                                              <ResultCard num={resultCard[0]} />
                                                              <ResultCard num={resultCard[1]} />
                                                            </div>
                                                            {data.win === "11" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> :
                                                              <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>}
                                                          </div>
                                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2 border-r py-2'>
                                                            <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                            <div className='gx-bg-flex space-x-2 py-2'>
                                                              <ResultCard num={resultCard[2]} />
                                                              <ResultCard num={resultCard[3]} />
                                                            </div>
                                                            {data.win === "21" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> :
                                                              <span className='text-white rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>}
                                                          </div>

                                                          <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2 col-span-2 border-t border-b p-4'>
                                                            <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                            <div className='gx-bg-flex space-x-2 py-2'>
                                                              <ResultCard num={resultCard[4]} />
                                                              <ResultCard num={resultCard[5]} />
                                                              <ResultCard num={resultCard[6]} />
                                                              <ResultCard num={resultCard[7]} />
                                                              <ResultCard num={resultCard[8]} />
                                                            </div>
                                                          </div>
                                                          <div className='space-y-1 border-t border-b p-2'>
                                                            <p className='text-base gx-font-bold text-[#169733]'>Winner:<span className='text-black'>{resultDesc[0]}</span></p>
                                                            <p className='text-base gx-font-bold text-yellow-400'>Player {resultDesc[1]}</p>
                                                          </div>
                                                        </div>
                                                      </div> : data.gtype === "War" ?
                                                        <div>
                                                          <div className='lg:block hidden'>
                                                            <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                                              <p className='text-lg font-medium'>Dealer</p>
                                                              <ResultCard num={resultCard[6]} />
                                                            </div>
                                                            <div className='grid grid-cols-6 gap-10 py-6'>
                                                              <div className="text-center flex gx-flex-column gx-align-items-center space-y-1">
                                                                <p className='text-lg font-medium'>Player 1</p>
                                                                <ResultCard num={resultCard[0]} />
                                                                {resultDesc.includes("1") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                              <div className="text-center flex gx-flex-column gx-align-items-center space-y-1">
                                                                <p className='text-lg font-medium'>Player 2</p>
                                                                <ResultCard num={resultCard[1]} />
                                                                {resultDesc.includes("2") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                              <div className="text-center flex gx-flex-column gx-align-items-center space-y-1">
                                                                <p className='text-lg font-medium'>Player 3</p>
                                                                <ResultCard num={resultCard[2]} />
                                                                {resultDesc.includes("3") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                              <div className="text-center flex gx-flex-column gx-align-items-center space-y-1">
                                                                <p className='text-lg font-medium'>Player 4</p>
                                                                <ResultCard num={resultCard[3]} />
                                                                {resultDesc.includes("4") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                              <div className="text-center flex gx-flex-column gx-align-items-center space-y-1">
                                                                <p className='text-lg font-medium'>Player 5</p>
                                                                <ResultCard num={resultCard[4]} />
                                                                {resultDesc.includes("5") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                              <div className="text-center flex gx-flex-column gx-align-items-center space-y-1">
                                                                <p className='text-lg font-medium'>Player 6</p>
                                                                <ResultCard num={resultCard[5]} />
                                                                {resultDesc.includes("6") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='lg:hidden block p-2 space-y-1'>
                                                            <div className='gx-bg-flex gx-justify-content-between gx-align-items-center border border-gray-400 p-2 shadow-lg'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-8'>
                                                                <p>Dealer</p>
                                                                <ResultCard num={resultCard[6]} />
                                                              </div>
                                                              <div>
                                                              </div>
                                                            </div>
                                                            <div className='gx-bg-flex gx-justify-content-between gx-align-items-center border border-gray-400 p-2 shadow-lg'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-8'>
                                                                <p>Player 1</p>
                                                                <ResultCard num={resultCard[0]} />
                                                              </div>
                                                              <div className='gx-bg-flex items-end justify-end px-2'>
                                                                {resultDesc.includes("1") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                            </div>
                                                            <div className='gx-bg-flex gx-justify-content-between gx-align-items-center border border-gray-400 p-2 shadow-lg'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-8'>
                                                                <p>Player 2</p>
                                                                <ResultCard num={resultCard[1]} />
                                                              </div>
                                                              <div className='gx-bg-flex items-end justify-end px-2'>
                                                                {resultDesc.includes("2") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                            </div>
                                                            <div className='gx-bg-flex gx-justify-content-between gx-align-items-center border border-gray-400 p-2 shadow-lg'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-8'>
                                                                <p>Player 3</p>
                                                                <ResultCard num={resultCard[2]} />
                                                              </div>
                                                              <div className='gx-bg-flex items-end justify-end px-2'>
                                                                {resultDesc.includes("3") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                            </div>
                                                            <div className='gx-bg-flex gx-justify-content-between gx-align-items-center border border-gray-400 p-2 shadow-lg'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-8'>
                                                                <p>Player 4</p>
                                                                <ResultCard num={resultCard[3]} />
                                                              </div>
                                                              <div className='gx-bg-flex items-end justify-end px-2'>
                                                                {resultDesc.includes("4") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                            </div>
                                                            <div className='gx-bg-flex gx-justify-content-between gx-align-items-center border border-gray-400 p-2 shadow-lg'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-8'>
                                                                <p>Player 5</p>
                                                                <ResultCard num={resultCard[4]} />
                                                              </div>
                                                              <div className='gx-bg-flex items-end justify-end px-2'>
                                                                {resultDesc.includes("5") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                            </div>
                                                            <div className='gx-bg-flex gx-justify-content-between gx-align-items-center border border-gray-400 p-2 shadow-lg'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-8'>
                                                                <p>Player 6</p>
                                                                <ResultCard num={resultCard[5]} />
                                                              </div>
                                                              <div className='gx-bg-flex items-end justify-end px-2'>
                                                                {resultDesc.includes("6") ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                              </div>
                                                            </div>

                                                          </div>
                                                        </div> : data.gtype === "cmeter" ?
                                                          <div className='gx-bg-flex gx-justify-content-between gx-align-items-center'>
                                                            <div className='space-y-2'>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-6'>
                                                                <div>
                                                                  <p className='gx-fs-xl gx-font-bold'>Low Cards</p>
                                                                </div>
                                                                <div className='gx-bg-flex space-x-1'>
                                                                  {groupedCards['1-9']?.map((card, index) => (
                                                                    <ResultCard num={card} />
                                                                  ))}
                                                                </div>
                                                              </div>
                                                              <div className='gx-bg-flex gx-align-items-center space-x-6'>
                                                                <div>
                                                                  <p className='gx-fs-xl gx-font-bold'>High Cards</p>
                                                                </div>
                                                                <div className='gx-bg-flex space-x-1'>
                                                                  {groupedCards['10-K']?.map((card, index) => (
                                                                    <ResultCard num={card} />
                                                                  ))}
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div>
                                                              <img src="/images/2DD.png" alt="" className="h-11 w-10" />
                                                            </div>
                                                          </div> : data.gtype === "cmatch20" ?
                                                            <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                                              <ResultCard num={data.cards} />
                                                            </div> : data.gtype === "baccarat" ?
                                                              <div className='grid grid-cols-2 w-full divide-x py-2'>
                                                                <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2'>
                                                                  <div className='text-2xl font-medium'>Player</div>
                                                                  <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                                                    <span className='-rotate-90'>
                                                                      {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                                    </span>
                                                                    {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                    {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                  </div>
                                                                  {data.win === "1" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                                </div>
                                                                <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2'>
                                                                  <div className='text-2xl font-medium'>Player</div>
                                                                  <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                                                    {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                    {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                                    <span className='rotate-90'>
                                                                      {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                                    </span>
                                                                  </div>
                                                                  {data.win === "2" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                                </div>
                                                              </div> : data.gtype === "baccarat2" ?
                                                                <div className='grid grid-cols-2 w-full divide-x py-2'>
                                                                  <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2'>
                                                                    <div className='text-2xl font-medium'>Player</div>
                                                                    <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                                                      <span className='-rotate-90'>
                                                                        {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                                      </span>
                                                                      {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                      {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                    </div>
                                                                    {data.win === "1" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                                  </div>
                                                                  <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center space-y-2'>
                                                                    <div className='text-2xl font-medium'>Player</div>
                                                                    <div className='gx-bg-flex gx-justify-content-center gx-align-items-center text-base space-x-1'>
                                                                      {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                      {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                                      <span className='rotate-90'>
                                                                        {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                                      </span>
                                                                    </div>
                                                                    {data.win === "2" ? <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span> : null}
                                                                  </div>
                                                                </div> : data.gtype === "Teen" ?
                                                                  <div className=''>
                                                                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                                                      <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                                      <div className='gx-bg-flex space-x-2 py-2'>
                                                                        <ResultCard num={resultCard[0]} />
                                                                        <ResultCard num={resultCard[1]} />
                                                                        <ResultCard num={resultCard[2]} />
                                                                      </div>
                                                                    </div>
                                                                    {data.win === "1" ?
                                                                      <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                                                        <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                                                      </div> : null
                                                                    }
                                                                    <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                                                      <p className='gx-fs-xl gx-font-bold'>Player B</p>
                                                                      <div className='gx-bg-flex space-x-2 py-2'>
                                                                        <ResultCard num={resultCard[3]} />
                                                                        <ResultCard num={resultCard[4]} />
                                                                        <ResultCard num={resultCard[5]} />
                                                                      </div>
                                                                    </div>
                                                                    {data.win === "2" ?
                                                                      <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                                                        <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                                                      </div> : null
                                                                    }
                                                                  </div>
                                                                  : <>
                                                                    {/* 3card jugement page model  */}
                                                                    {/* <div className='gx-bg-flex gx-justify-content-center gx-align-items-center space-x-2'>
                                                                                                                             <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                             <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                             <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                         </div> */}
                                                                    {/*3card jugement page model  */}
                                                                    {/* oneday teenpatti page model  */}
                                                                    {/* <div>
                                                                                                                             <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                                                                                                                 <p className='gx-fs-xl gx-font-bold'>Player A</p>
                                                                                                                                 <div className='gx-bg-flex space-x-2 py-2'>
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                 </div>
                                                                                                                             </div>
                                                                                                                             <div className='gx-bg-flex gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                                                                                                                 <span className='text-[#169733] pulse rounded-full gx-text-green-0'><BsTrophyFill size={30} /> </span>
                                                                                                                             </div>
                                                                                                                             <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>
                                                                                                                                 <p className='gx-fs-xl gx-font-bold'>Player B</p>
                                                                                                                                 <div className='gx-bg-flex space-x-2 py-2'>
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                 </div>
                                                                                                                             </div>

                                                                                                                         </div> */}

                                                                    {/* test teenpatti page model  */}
                                                                    {/* dragon tiger page model  */}
                                                                    {/* <div>
                                                                                                                             <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center'>

                                                                                                                                 <div className='gx-bg-flex space-x-2 py-2'>
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                     <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                 </div>
                                                                                                                             </div>
                                                                                                                             <div className='gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center gx-pt-2 '>
                                                                                                                                 <p className='font-medium text-green-400'>Result: <span className='text-black'>Dragon|No Pair</span> </p>
                                                                                                                                 <p className='font-medium text-green-400'>Dragon: <span className='text-black'>Black|Even|Card4</span> </p>
                                                                                                                                 <p className='font-medium text-green-400'>Tiger: <span className='text-black'>Black|Even|Card2</span> </p>
                                                                                                                             </div>
                                                                                                                         </div> */}
                                                                    {/* dragon tiger page model  */}
                                                                  </>}
          </div>
        </div>
      </div>


    </Modal>

  );
};

export default DemoResult;