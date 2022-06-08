import Close from '@components/Close'
import Header from '@components/Header'
import Link from 'next/link'
import React from 'react'

const InfoPage = () => {
  return (
    <div className='py-10 px-4 md:p-10'>
      <div className='w-full h-8 mb-10 grid justify-end'>
        <Link passHref href='/'>
          <a className='h-6 w-6 grid relative '>
            <Close className='h-full w-full' />
          </a>
        </Link>
      </div>
      <div className='rich-text max-w-md md:max-w-2xl md:mx-auto text-xl leading-relaxed'>
        <h1>Some tips:</h1>
        <ol>
          <li>
            <p>
              You can press “Where are the sculptures” in
              the upper right corner if you get lost.
            </p>
          </li>
          <li>
            <p>
              When in proximity to a sculpture, you will be
              offered to collect it. Doing so will give you
              access to a digital version of the sculpture.
              The sculpture will also be added to your{' '}
              <strong>bag</strong>.
            </p>
          </li>
          <li>
            <p>
              The <strong>bag</strong> is where all your
              collected sculptures are kept. There you can
              access them, ad infinitum, as long as you are
              on the same device that collected them.
            </p>
          </li>
        </ol>
      </div>
      <div className='rich-text max-w-md md:max-w-2xl md:mx-auto text-xl leading-relaxed'>
        <h1>About the project:</h1>
        <p>
          Sculpture Hunt is an internet artwork and
          exhibition concept by visual artist Emma
          Heiðarsdóttir.
        </p>
        <p>
          The work combines the digital and physical
          reality, as it guides the viewer through a pathway
          where sculptures are found, unlocked and collected
          in a digital bag.
        </p>
        <p>
          Each sculpture is represented with an icon on the
          map. All works can be experienced from the public
          area of the pathway. Please don’t enter private
          areas.
        </p>
        <p>++++</p>
        <p>
          <strong>Programmer and consultant:</strong> Jón
          Gabríel Lorange
        </p>
        <p>
          This work is part of outdoor group exhibition The
          Wheel V - more information:
          <a
            target='_blank'
            rel='noreferrer'
            href='http://hjolid.is'
            className='underline ml-2'
          >
            hjolid.is
          </a>
        </p>
        <p>
          More about Emma:
          <a
            target='_blank'
            rel='noreferrer'
            href='https://emmaheidarsdottir.info'
            className='underline ml-2'
          >
            emmaheidarsdottir.info
          </a>
        </p>
      </div>
    </div>
  )
}

export default InfoPage
