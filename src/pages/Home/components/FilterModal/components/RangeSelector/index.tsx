/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Range, getTrackBackground } from 'react-range';

const STEP = 10;
export const MIN_RANGE_VALUE = 0;
export const MAX_RANGE_VALUE = 1000;

type RangeSelectorProps = {
  values: number[];
  setValues: (values: number[]) => void;
};

function RangeSelector({ setValues, values }: RangeSelectorProps) {
  return (
    <Range
      values={values}
      step={STEP}
      min={MIN_RANGE_VALUE}
      max={MAX_RANGE_VALUE}
      rtl={false}
      onChange={(vals) => {
        setValues(vals);
      }}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: '36px',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: '5px',
              width: '88%',
              borderRadius: '4px',
              background: getTrackBackground({
                values,
                colors: ['#F4F5F6', '#DC1637', '#F4F5F6'],
                min: MIN_RANGE_VALUE,
                max: MAX_RANGE_VALUE,
                rtl: false,
              }),
              alignSelf: 'center',
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '32px',
            width: '40px',
            borderRadius: '4px',
            backgroundColor: '#FFF',
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 2px 6px #AAA',
          }}
        >
          <div
            style={{
              height: '8px',
              width: '2px',
              backgroundColor: isDragged ? '#DC1637' : '#CCC',
            }}
          />
          <div
            style={{
              height: '8px',
              width: '2px',
              backgroundColor: isDragged ? '#DC1637' : '#CCC',
            }}
          />
        </div>
      )}
    />
  );
}

export default RangeSelector;
