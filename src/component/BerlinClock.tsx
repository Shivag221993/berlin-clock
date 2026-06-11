import { useBerlinClock } from '../hooks/useBerlinClock';
import './BerlinClock.css';

export function BerlinClock(){
  const {
    digitalTime,
    isCustomMode,
    customTime,
    setIsCustomMode,
    setCustomTime,
    secondsLamp,
    fiveHoursRow,
    oneHourRow,
    fiveMinutesRow,
    oneMinuteRow,
  } = useBerlinClock();

  return (
    <div className="berlin-clock-container">
      <h2 className="berlin-clock-title">Berlin Clock</h2>
      
      {/* Seconds Row */}
      <div className={`berlin-clock-lamp berlin-clock-seconds ${secondsLamp ? 'lamp-red' : 'lamp-off'}`} />

      {/* 5 Hours Row */}
      <div className="berlin-clock-row">
        {fiveHoursRow.map((isActive, i) => (
          <div key={`5h-${i}`} className={`berlin-clock-lamp ${isActive ? 'lamp-red' : 'lamp-off'}`} />
        ))}
      </div>

      {/* 1 Hour Row */}
      <div className="berlin-clock-row">
        {oneHourRow.map((isActive, i) => (
          <div key={`1h-${i}`} className={`berlin-clock-lamp ${isActive ? 'lamp-red' : 'lamp-off'}`} />
        ))}
      </div>

      {/* 5 Minutes Row */}
      <div className="berlin-clock-row">
        {fiveMinutesRow.map((isActive, i) => {
          const isRedIndicator = (i + 1) % 3 === 0;
          const targetColorClass = isRedIndicator ? 'lamp-red' : 'lamp-yellow';
          return (
            <div 
              key={`5m-${i}`} 
              className={`berlin-clock-lamp ${isActive ? targetColorClass : 'lamp-off'}`} 
            />
          );
        })}
      </div>

      {/* 1 Minute Row */}
      <div className="berlin-clock-row">
        {oneMinuteRow.map((isActive, i) => (
          <div key={`1m-${i}`} className={`berlin-clock-lamp ${isActive ? 'lamp-yellow' : 'lamp-off'}`} />
        ))}
      </div>

      <div className="berlin-clock-digital">{digitalTime}</div>

      {/* Dynamic Controls Interlocking */}
      <div className="berlin-clock-controls">
        <div className="control-group">
          <label htmlFor="mode-checkbox">Enable Custom Time</label>
          <input 
            id="mode-checkbox"
            type="checkbox" 
            checked={isCustomMode} 
            onChange={(e) => setIsCustomMode(e.target.checked)} 
          />
        </div>

        {isCustomMode && (
          <div className="control-group">
            <label htmlFor="time-picker">Set Time (HH:mm:ss)</label>
            <input 
              id="time-picker"
              type="text" 
              className="control-input"
              value={customTime} 
              placeholder="12:00:00"
              onChange={(e) => setCustomTime(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};