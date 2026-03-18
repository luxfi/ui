import * as React from 'react';

import { cn } from './utils';

// Inline star icons
const StarFilledIcon = ({ className }: { readonly className?: string }) => (
  <svg className={ className } viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const StarOutlineIcon = ({ className }: { readonly className?: string }) => (
  <svg className={ className } viewBox="0 0 20 20" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" strokeWidth="1.5"/>
  </svg>
);

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  count?: number;
  label?: string | Array<string>;
  defaultValue?: number;
  onValueChange?: ({ value }: { value: number }) => void;
  readOnly?: boolean;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  function Rating(props, ref) {
    const { count = 5, label: labelProp, defaultValue = 0, onValueChange, readOnly, className, ...rest } = props;

    const [ value, setValue ] = React.useState(defaultValue);
    const [ hoveredIndex, setHoveredIndex ] = React.useState(-1);

    const highlightedIndex = hoveredIndex >= 0 && !readOnly ? hoveredIndex + 1 : value;
    const label = Array.isArray(labelProp) ? labelProp[highlightedIndex - 1] : labelProp;

    const handleClick = React.useCallback((index: number) => () => {
      if (readOnly) return;
      setValue(index);
      onValueChange?.({ value: index });
    }, [ readOnly, onValueChange ]);

    const handleMouseEnter = React.useCallback((index: number) => () => {
      if (readOnly) return;
      setHoveredIndex(index);
    }, [ readOnly ]);

    const handleMouseLeave = React.useCallback(() => {
      setHoveredIndex(-1);
    }, []);

    return (
      <div ref={ ref } className={ cn('inline-flex items-center gap-1', className) } { ...rest }>
        <div className="inline-flex items-center" onMouseLeave={ handleMouseLeave }>
          { Array.from({ length: count }).map((_, index) => {
            const filled = index < highlightedIndex;
            const starIndex = index + 1;

            return (
              <button
                key={ index }
                type="button"
                tabIndex={ readOnly ? -1 : 0 }
                aria-label={ `Rate ${ starIndex } of ${ count }` }
                className={ cn(
                  'inline-flex items-center justify-center w-5 h-5 text-current',
                  readOnly ? 'cursor-default' : 'cursor-pointer',
                ) }
                onClick={ handleClick(starIndex) }
                onMouseEnter={ handleMouseEnter(index) }
              >
                { filled ? <StarFilledIcon className="w-5 h-5"/> : <StarOutlineIcon className="w-5 h-5"/> }
              </button>
            );
          }) }
        </div>
        { label && <span className="text-sm">{ label }</span> }
      </div>
    );
  },
);
