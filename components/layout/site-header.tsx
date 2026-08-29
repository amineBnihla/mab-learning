import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { BellIcon, ChatIcon } from "@/components/ui/icons";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Learn", href: "/#catalog-results" },
  { label: "Practice" },
  { label: "Connect" },
] as const;

type SiteHeaderProps = {
  activeItem?: (typeof navigation)[number]["label"];
};

export function SiteHeader({ activeItem = "Learn" }: SiteHeaderProps) {
  return (
    <header className="glass-surface fixed inset-x-0 top-0 z-50 h-16 border-b border-outline-variant/30">
      <div className="vertex-container flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-7">
          <Link aria-label="Vertex home" className="relative block size-8 shrink-0" href="/">
            <Image
              alt=""
              className="object-contain"
              fill
              priority
              sizes="32px"
              src="/images/learning-catalog/vertex-mark.jpg"
            />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => {
              const isActive = item.label === activeItem;

              if ("href" in item) {
                return (
                  <Link
                    key={item.label}
                    aria-current={isActive ? "page" : undefined}
                    className={`border-b-2 pb-1 text-label-md transition-colors hover:text-primary ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-on-surface-variant hover:border-primary/50"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <span
                  key={item.label}
                  className="border-b-2 border-transparent pb-1 text-label-md text-on-surface-variant"
                >
                  {item.label}
                </span>
              );
            })}
          </nav>
        </div>

        <Show when="signed-out">
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <SignInButton>
              <button
                className="inline-flex min-h-10 items-center justify-center rounded-control px-2.5 text-label-md text-primary transition-colors hover:bg-primary-fixed sm:px-3"
                type="button"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className="inline-flex min-h-10 items-center justify-center rounded-control bg-brand-orange px-3 text-label-md text-white shadow-sm transition-colors hover:bg-primary sm:px-4"
                type="button"
              >
                Sign up
              </button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <button
              className="hidden min-h-11 rounded-control bg-brand-orange px-4 text-label-md text-white shadow-sm transition-colors hover:bg-primary md:inline-flex md:items-center"
              type="button"
            >
              Get Started (0/3)
            </button>

            <button
              aria-label="Notifications, one unread"
              className="relative grid size-10 place-items-center rounded-control text-secondary transition-colors hover:bg-primary-fixed hover:text-primary"
              type="button"
            >
              <BellIcon className="size-6" />
              <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand-orange" />
            </button>

            <button
              aria-label="Messages"
              className="grid size-10 place-items-center rounded-control text-secondary transition-colors hover:bg-primary-fixed hover:text-primary"
              type="button"
            >
              <ChatIcon className="size-6" />
            </button>

            <div className="grid size-8 place-items-center">
              <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
            </div>
          </div>
        </Show>
      </div>
    </header>
  );
}
