import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { signOut } from 'src/controllers/auth.controller';
import { displayGeneralErrorToast } from 'src/scripts/toast.script';
import { RootState } from 'src/store/store';
import { clearUser } from 'src/store/slices/auth.slice';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import { buttonVariants } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu';

function Header() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const [abbreviatedName, setAbbreviatedName] = useState('');
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);

  useEffect(() => {
    if (user) {
      const abbreviatedName = user.name
        .trim()
        .split(' ')
        .map((item: string) => item.charAt(0))
        .slice(0, 2)
        .join('');

      setAbbreviatedName(abbreviatedName);
    }
  }, [user]);

  async function handleSignOutItemClick() {
    setIsLoadingSignOut(true);

    try {
      await signOut();
      dispatch(clearUser());
    } catch {
      displayGeneralErrorToast();
    }

    setIsLoadingSignOut(false);
  }

  return (
    <header className="bg-background border-b">
      <div className="mx-auto max-w-screen-xl px-6 py-4 flex items-center justify-between">
        <Link className="text-lg font-medium p-2 -my-0.5 -mx-2" to="/">
          Altametrics
        </Link>

        <nav>
          <ul className="flex items-center gap-2">
            <li>
              <NavLink
                className={({ isActive }) =>
                  buttonVariants({ variant: isActive ? 'secondary' : 'ghost' })
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  buttonVariants({ variant: isActive ? 'secondary' : 'ghost' })
                }
                to="/invoices"
              >
                Invoices
              </NavLink>
            </li>
          </ul>
        </nav>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full cursor-pointer">
              <Avatar className="size-10">
                <AvatarImage src="" alt="" />
                <AvatarFallback className="text-sm font-medium">
                  {abbreviatedName}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-48" align="end" side="bottom">
              <DropdownMenuLabel>
                <span className="block truncate text-sm font-semibold leading-tight">
                  {user.name}
                </span>
                <span className="block truncate text-xs font-normal leading-tight">
                  {user.email}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                disabled={isLoadingSignOut}
                onClick={handleSignOutItemClick}
              >
                <LogOut />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            className={buttonVariants({ variant: 'default' })}
            to="/auth/sign-in"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export { Header };
