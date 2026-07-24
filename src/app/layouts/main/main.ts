import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  radixBell,
  radixHamburgerMenu,
  radixPerson,
  radixFileText,
  radixBarChart,
  radixPlus,
} from '@ng-icons/radix-icons';

@Component({
  selector: 'app-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzBadgeModule,
    NgIcon,
  ],
  viewProviders: [
    provideIcons({
      radixBell,
      radixHamburgerMenu,
      radixPerson,
      radixFileText,
      radixBarChart,
      radixPlus,
    }),
  ],
  template: `
    <nz-layout class="h-screen w-screen overflow-hidden bg-slate-50 antialiased text-slate-800">
      <nz-sider
        nzCollapsible
        [(nzCollapsed)]="isCollapsed"
        [nzTrigger]="null"
        [nzBreakpoint]="'lg'"
        [nzCollapsedWidth]="80"
        [nzWidth]="260"
        class="bg-primary-950 text-white shadow-xl transition-all duration-300"
      >
        <div class="flex flex-col h-full justify-between">
          <div>
            <div
              class="flex items-center h-16 border-b border-primary-800/50 overflow-hidden transition-all duration-300"
              [class.justify-center]="isCollapsed()"
              [class.px-5]="!isCollapsed()"
            >
              <span class="font-bold text-xl text-white tracking-tight flex items-center gap-3">
                <ng-icon name="radixPlus" class="w-6 h-6 text-secondary-300 shrink-0" />
                @if (!isCollapsed()) {
                  <div class="flex flex-col transition-opacity duration-200">
                    <span class="text-primary-400 font-bold leading-tight text-base">MedSystem</span>
                    <span class="text-xs text-primary-500 font-medium tracking-normal truncate">Portal Clínico</span>
                  </div>
                }
              </span>
            </div>

            <ul nz-menu nzMode="inline" class="bg-transparent border-none px-3 py-4 space-y-1.5">
              @for (item of navItems; track item.path) {
                <li
                  nz-menu-item
                  [nzSelected]="rla.isActive"
                  class="rounded-lg !flex items-center transition-all duration-150 border-l-4 border-transparent"
                  [class.justify-center]="isCollapsed()"
                >
                  <a
                    [routerLink]="item.path"
                    routerLinkActive
                    #rla="routerLinkActive"
                    [routerLinkActiveOptions]="{ exact: false }"
                    class="flex items-center gap-3 w-full h-full text-current"
                    [class.justify-center]="isCollapsed()"
                  >
                    <ng-icon [name]="item.icon" class="w-5 h-5 opacity-90 shrink-0" />
                    @if (!isCollapsed()) {
                      <span class="truncate text-sm font-medium">{{ item.label }}</span>
                    }
                  </a>
                </li>
              }
            </ul>
          </div>

          <div
            class="border-t border-primary-800/50 shrink-0 overflow-hidden transition-all duration-300"
            [class.p-2]="isCollapsed()"
            [class.p-4]="!isCollapsed()"
          >
            <button
              nz-button
              nzType="primary"
              routerLink="/patients/new"
              class="w-full h-11 flex items-center justify-center rounded-lg bg-secondary-500 hover:bg-secondary-400 border-none text-white font-semibold text-sm shadow-md transition-all duration-300"
              [title]="isCollapsed() ? 'Nueva Admisión' : ''"
            >
              <ng-icon name="radixPlus" class="w-5 h-5 shrink-0" />
              @if (!isCollapsed()) {
                <span class="ml-2 truncate transition-opacity duration-200">Nueva Admisión</span>
              }
            </button>
          </div>
        </div>
      </nz-sider>

      <nz-layout class="h-full flex flex-col overflow-hidden">

        <nz-header
          class="sticky top-0 z-30 !bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 !h-16 !flex !items-center !justify-between gap-4 shadow-sm shrink-0 !leading-none"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
            <button
              class="text-slate-700 hover:text-primary-600 transition-colors p-1 flex items-center justify-center rounded-md hover:bg-slate-100 shrink-0"
              (click)="isCollapsed.set(!isCollapsed())"
              aria-label="Toggle menú de navegación"
            >
              <ng-icon name="radixHamburgerMenu" class="w-6 h-6" />
            </button>

            <h1 class="text-sm sm:text-base md:text-lg font-semibold text-slate-900 tracking-tight truncate m-0 min-w-0">
              Hospital "Dr. Patrocinio Peñuela Ruiz"
            </h1>
          </div>

          <div class="flex items-center gap-3 shrink-0 ml-auto">
            <nz-badge nzDot class="cursor-pointer flex items-center justify-center">
              <button
                class="p-2 text-slate-500 hover:text-primary-600 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
                aria-label="Notificaciones"
              >
                <ng-icon name="radixBell" class="w-5 h-5" />
              </button>
            </nz-badge>
            <div class="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>
          </div>
        </nz-header>

        <nz-content class="flex-1 overflow-y-auto w-full focus:outline-none">
          <div class="w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <router-outlet />
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
})
export class Main {
  protected readonly isCollapsed = signal(false);

  protected readonly navItems = [
    {
      path: '/patients',
      label: 'Pacientes',
      icon: 'radixPerson',
    },
    {
      path: '/clinical-records',
      label: 'Historias Clínicas',
      icon: 'radixFileText',
    },
    {
      path: '/statistics',
      label: 'Estadísticas',
      icon: 'radixBarChart',
    },
  ];
}
