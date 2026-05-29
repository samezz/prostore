
//HEADER (right menu part)

import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import UserButton from './user-button';


import Link from 'next/link';
import ModeToggle from './mode-toggle';


const Menu = () => {
  return (
    <>
      <div className='flex justify-end gap-3'>
        <nav className='md:flex hidden w-full max-w-xs gap-1'>
          <ModeToggle />
          <Button asChild variant='ghost'>
            <Link href='/cart'>
              <ShoppingCart />
              Cart
            </Link>
          </Button>
           <UserButton />
        </nav>
        <nav className='md:hidden'>
            <Sheet>

                <SheetTrigger className='align-middle'>
                <EllipsisVertical />
                </SheetTrigger>

                <SheetContent className='flex flex-col items-start'>

                <SheetTitle>Menu</SheetTitle>
                
                <ModeToggle />

                <Button asChild variant='ghost'>
                    <Link href='/cart'>
                    
                    <ShoppingCart />
                    Cart
                    </Link>
                </Button>

                <UserButton />

                <SheetDescription></SheetDescription> {/* to avoid warning */}

                </SheetContent>
            </Sheet>
            </nav>



      </div>
    </>
  );
};

export default Menu;