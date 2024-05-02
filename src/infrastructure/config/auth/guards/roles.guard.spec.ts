import { TestingModule, Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    rolesGuard = module.get<RolesGuard>(RolesGuard);
  });

  it('should allow access when no roles are required', () => {
    const context = createMockExecutionContext(null);
    const canActivate = rolesGuard.canActivate(context);
    expect(canActivate).toBe(true);
  });

  it('should allow access when user has required role', () => {
    const requiredRoles = ['regular', 'admin'];
    const context = createMockExecutionContext(requiredRoles, {
      role: 'admin',
    });
    const canActivate = rolesGuard.canActivate(context);
    expect(canActivate).toBe(true);
  });

  it('should deny access when user does not have required role', () => {
    const requiredRoles = ['admin'];
    const context = createMockExecutionContext(requiredRoles, {
      role: 'regular',
    });
    const canActivate = rolesGuard.canActivate(context);
    expect(canActivate).toBe(false);
  });
});

function createMockExecutionContext(
  requiredRoles: string[] | null,
  user?: { role: string },
) {
  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue(requiredRoles),
  };

  const context: Partial<ExecutionContext> = {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ user }),
    }),
  };

  return context as ExecutionContext;
}
