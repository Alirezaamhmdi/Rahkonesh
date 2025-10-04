import { useState, useRef, useEffect, useContext, type RefObject } from 'react';
import { useSelector } from 'react-redux';
import MiniPicture from './picture/minipicture';
import PinnedCheckBox from './checkbox/pinned.tsx';
import CircleCheckBox from './checkbox/circle.tsx';
import observerContext from '../context/observingContext';
import { addListener } from '@reduxjs/toolkit';
import { Eye, Trash } from 'iconsax-reactjs';
import avatar from '../assets/png/Avatar.png';

interface msg {
  checkSum: string; // unique key
  type: string;
  MSG: string;
  title: string;
  imageURL: string; // if the url is empty => the image is logo image
  date: Date;
  pinned: boolean;
}

export const MassageContainer = ({ MSG }: { MSG: msg }) => {
  const [selected, setSelected] = useState(false);
  const [pinned, setPinned] = useState(MSG.pinned);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const observer = useContext(observerContext);
  const handleObserved = () => {
    setShouldLoad(true)

  };
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !observer) return;
    element.dataset.onVisible = 'true';
    observer.observe(element);
    element.addEventListener('onObserved', handleObserved);
    return () => {
      observer.unobserve(element);
      element.removeEventListener('onObserved', handleObserved);
    };
  }, [observer]);

  return (
    <article
      ref={containerRef}
      className={`flex w-full gap-4 pl-6 pr-4 py-4 ${
        selected ? 'bg-green-50' : pinned ? 'primary-100' : 'bg-white'
      } transition-colors`}
      title={`Message: ${MSG.title}`}
    >
      <div className=" relative overflow-hidden w-[2rem]" title="Message avatar">
        <MiniPicture
          classname='h-[2rem]'
          url={MSG.imageURL}
          shouldLoad={shouldLoad}
          onClick={() => {}}
          rounded="full"
        />
      </div>
      <div className="w-full">
        <section className="flex-col w-full">
          <header className="flex w-full justify-between items-center">
            <h1 className="text-black text-shadow-2xs" title={`Message title: ${MSG.title}`}>
              {MSG.title}
            </h1>
            <div className="flex flex-col justify-center gap-1 items-center">
              <CircleCheckBox
                state={selected}
                setState={setSelected}
              />

              <PinnedCheckBox
                state={pinned}
                setState={setPinned}
              />
            </div>
          </header>
          <p className="text-xs text-neutral-500" title={`Message content: ${MSG.MSG}`}>
            {MSG.MSG}
          </p>
          <time
            className="text-[10px] text-neutral-500"
            title={`Sent: ${MSG.date.toLocaleString()}`}
            dateTime={MSG.date.toISOString()}
          >
            {MSG.date.toLocaleString()}
          </time>
        </section>
      </div>
    </article>
  );
};

export const InvitationContainer = ({ MSG }: { MSG: msg }) => {
  const [selected, setSelected] = useState(false);
  const [pinned, setPinned] = useState(MSG.pinned);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const observer = useContext(observerContext);
  const handleObserved = () => {
   setShouldLoad(true)
    
  };
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !observer) return;
    element.dataset.onVisible = 'true';
    observer.observe(element);
    element.addEventListener('onObserved', handleObserved);
    return () => {
      observer.unobserve(element);
      element.removeEventListener('onObserved', handleObserved);
    };
  }, [observer]);

  return (
    <article
      ref={containerRef}
      className={`flex w-full gap-4 pl-6 pr-4 py-4 ${
        selected ? 'bg-green-50' : 'primary-100'
      }`}
      title={`Invitation: ${MSG.title}`}
    >
      <div className=" w-[2rem]" title="Invitation avatar">
        <MiniPicture
          classname='h-[2rem] !w-[2rem] '
          url={MSG.imageURL}
          shouldLoad={shouldLoad}
          onClick={() => {}}
          rounded="full"
        />
      </div>
      <div className="w-full">
        <section className="flex-col w-full">
          <header className="flex w-full justify-between items-center">
            <h1 className="text-black text-shadow-2xs" title={`Invitation title: ${MSG.title}`}>
              {MSG.title}
            </h1>
            <div className="flex flex-col justify-center gap-1 items-center">
              <CircleCheckBox
                state={selected}
                setState={setSelected}
              />
              <PinnedCheckBox
                state={pinned}
                setState={setPinned}
              />
            </div>
          </header>
          <p className="text-xs text-neutral-500" title={`Invitation content: ${MSG.MSG}`}>
            {MSG.MSG}
          </p>
          <div className="flex justify-end text-[10px] gap-2 w-full py-3">
            <button
              className="rounded-[10px] px-[.365rem] text-white primary h-[2rem] hover:opacity-60 cursor-pointer transition-opacity duration-300"
              title="Accept this invitation"
            >
              قبول میکنم
            </button>
            <button
              className="rounded-[10px] primary-text white outine-1 outline outline-[#9429C5] h-[2rem] px-1.5 hover:opacity-60 cursor-pointer transition-opacity duration-300"
              title="Reject this invitation"
            >
              رد میکنم
            </button>
          </div>
          <time
            className="text-[10px] text-neutral-500"
            title={`Sent: ${MSG.date.toLocaleString()}`}
            dateTime={MSG.date.toISOString()}
          >
            {MSG.date.toLocaleString()}
          </time>
        </section>
      </div>
    </article>
  );
};

const Massages = ({ ref,  open = false  }: { ref: RefObject<HTMLElement> , open : boolean}) => {
  const x: msg[] = [
    {
      checkSum: 'abc123',
      type: 'IVITE',
      MSG: "You're invited to our annual team meeting!",
      title: 'Team Meeting 2025',
      imageURL: 'https://example.com/invite.jpg',
      date: new Date('2025-09-01T10:00:00Z'),
      pinned: true,
    },
    {
      checkSum: 'def456',
      type: 'REGULAR',
      MSG: 'Reminder: Submit your project updates by EOD.',
      title: 'Project Update',
      imageURL: avatar,
      date: new Date('2025-08-15T14:30:00Z'),
      pinned: false,
    },
    {
      checkSum: 'ghi789',
      type: 'IVITE',
      MSG: 'Join us for a virtual happy hour this Friday!',
      title: 'Virtual Happy Hour',
      imageURL: avatar,
      date: new Date('2025-08-20T17:00:00Z'),
      pinned: false,
    },
    {
      checkSum: 'ghi789',
      type: 'IVITE',
      MSG: 'Join us for a virtual happy hour this Friday!',
      title: 'Virtual Happy Hour',
      imageURL: avatar,
      date: new Date('2025-08-20T17:00:00Z'),
      pinned: false,
    },{
      checkSum: 'ghi789',
      type: 'IVITE',
      MSG: 'Join us for a virtual happy hour this Friday!',
      title: 'Virtual Happy Hour',
      imageURL: avatar,
      date: new Date('2025-08-20T17:00:00Z'),
      pinned: false,
    },{
      checkSum: 'ghi789',
      type: 'IVITE',
      MSG: 'Join us for a virtual happy hour this Friday!',
      title: 'Virtual Happy Hour',
      imageURL: avatar,
      date: new Date('2025-08-20T17:00:00Z'),
      pinned: false,
    },{
      checkSum: 'ghi789',
      type: 'IVITE',
      MSG: 'Join us for a virtual happy hour this Friday!',
      title: 'Virtual Happy Hour',
      imageURL: avatar,
      date: new Date('2025-08-20T17:00:00Z'),
      pinned: false,
    },
    {
      checkSum: 'jkl012',
      type: 'REGULAR',
      MSG: 'New office guidelines have been posted.',
      title: 'Office Guidelines Update',
      imageURL: avatar,
      date: new Date('2025-08-10T09:00:00Z'),
      pinned: true,
    },
    {
      checkSum: 'mno345',
      type: 'IVITE',
      MSG: "You're invited to the product launch event!",
      title: 'Product Launch',
      imageURL: 'https://example.com/productlaunch.jpg',
      date: new Date('2025-10-01T12:00:00Z'),
      pinned: true,
    },
  ];
  const [affect, setEffect] = useState(false);
  const [allMassages, setAllMassages] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const onVisible = (entry.target as HTMLElement).dataset.onVisible;
            if (onVisible) {
              entry.target.dispatchEvent(new CustomEvent('onObserved'));
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const selectAll = useRef(document.createElement('input'));

  return (
    <section
    className={`absolute rounded-3xl w-[26.5rem] shadow-custom transition-all duration-600 ease-out top-0 mt-[4.5rem] bg-white overflow-hidden left-0 z-[99999] ${
    !open ? "h-0  pointer-events-none" : "h-[42rem] opacity-100"
  }`}      ref={ref}
      title="Messages and invitations"
    >
      <header className="flex justify-between py-4 px-4 items-center">
        <div className="flex gap-2 text-base text-[#39475B] items-center">
          پیام ها
          <span
            className="content-center text-center text-white bg-[#E337AF] text-xs size-5 rounded-full"
            title="Total messages: 12"
          >
            12
          </span>
        </div>
        <div className="text-xs flex items-center gap-1 cursor-pointer select-none">
          <input
            type="checkbox"
            className="accent-green-600"
            ref={selectAll}
            title="Select all messages"
          />
          <span
            onClick={() => {
              if (selectAll.current) {
                selectAll.current.checked = !selectAll.current.checked;
              }
            }}
            title="Toggle selection of all messages"
          >
            علامت گذاری همه
          </span>
        </div>
      </header>
      <nav className="flex justify-between px-6 h-10 gap-6 border-b-2 border-b-neutral-200">
        <button
          className={`text-center w-full h-full transition-all border-[#9429C5] ${
            allMassages ? ' text-[#AA44DA] border-b-2 ' : ''
          } cursor-pointer`}
          onClick={() => setAllMassages(true)}
          title="Show all messages"
        >
          همه پیام ها
        </button>
        <button
          className={`w-full text-center h-full transition-all border-[#9429C5] ${
            !allMassages ? ' text-[#AA44DA] border-b-2 ' : ''
          } cursor-pointer`}
          onClick={() => setAllMassages(false)}
          title="Show only unread messages"
        >
          خوانده نشده ها
        </button>
      </nav>
      <observerContext.Provider value={observerRef.current}>
        <div className="max-h-[552px] min-h-[300px] overflow-scroll w-full pb-12.5" title="Message list">
          {x.map((value: msg, index: number) => {
            switch (value.type) {
              case 'IVITE':
                return <InvitationContainer MSG={value} key={index} />;
              case 'REGULAR':
                return <MassageContainer MSG={value} key={index} />;
            }
          })}
        </div>
        <footer className="absolute bottom-0 h-[3.125rem] w-full flex justify-between items-center bg-white px-4 text-sm select-none">
          <div
            className={`flex items-center gap-1 hover:opacity-75 ${
              affect ? 'text-[#f47373] cursor-pointer' : 'text-neutral-400 cursor-not-allowed'
            }`}
            title={affect ? 'Delete selected messages' : 'Select messages to delete'}
          >
            <Trash />
            <p>حذف</p>
          </div>
          <div
            className={`flex items-center gap-1 hover:opacity-75 ${
              affect ? 'text-[#37d67a] cursor-pointer' : 'text-neutral-400 cursor-not-allowed'
            }`}
            title={affect ? 'Mark selected messages as read' : 'Select messages to mark as read'}
          >
            <p>دیده شده</p>
            <Eye />
          </div>
        </footer>
      </observerContext.Provider>
    </section>
  );
};

export default Massages;