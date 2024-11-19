/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import InputField from './InputField'
import alarm from '../assets/sounds/alarmSound.mp3'

const audio = new Audio(alarm)
function Timer({ isOverlay }) {
  const [isEditing, setIsEditing] = useState(false)
  const [hours, sethours] = useState(1)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let intervalId
    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          if (minutes === 0 && hours === 0) {
            audio.play(alarm)
            clearInterval(intervalId)
            setIsActive(false)
          } else {
            if (minutes === 0) {
              sethours((hour) => hour - 1)
              setMinutes(59)
            } else {
              setMinutes((minutes) => minutes - 1)
            }
            setSeconds(59)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [isActive, hours, minutes, seconds])

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center">
          <div>
            <InputField label={'Hours'} value={hours} onChange={(e) => sethours(+e.target.value)} />
            <InputField
              label={'Minutes'}
              onChange={(e) => setMinutes(+e.target.value)}
              value={minutes}
            />
            <InputField
              label={'Seconds'}
              onChange={(e) => setSeconds(+e.target.value)}
              value={seconds}
            />
            <button
              className="bg-blue-500 text-stone-200 px-20 py-1 rounded-xl text-xl ml-1 mt-1"
              onClick={() => setIsEditing(false)}
            >
              &#10004;
            </button>
          </div>
        </div>
      ) : (
        // Timer
        <div>
          <div className="flex justify-center">
            <h1 className="text-green-500  text-6xl">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
          </div>
          <div
            id="timer-buttons"
            className={
              !isOverlay
                ? 'text-stone-500 flex justify-center bg-black bg-opacity-10 rounded-xl'
                : 'hidden'
            }
          >
            {isActive ? (
              <>
                <button
                  className="start text-5xl text-yellow-500 m-2"
                  onClick={() => setIsActive(false)}
                >
                  ||
                </button>
                <button
                  className="start text-5xl text-red-500 m-2"
                  onClick={() => {
                    setIsActive(false)
                    sethours(0)
                    setMinutes(1)
                    setSeconds(0)
                  }}
                >
                  &#9632;
                </button>
              </>
            ) : (
              <>
                <button
                  className="start text-5xl text-green-500 m-2"
                  onClick={() => setIsActive(true)}
                >
                  &#9658;
                </button>
                <button
                  className="start text-5xl text-yellow-500 m-2"
                  onClick={() => setIsEditing(true)}
                >
                  &#9998;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Timer
