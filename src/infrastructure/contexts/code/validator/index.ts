import { ValidatorInterface } from '@/domain/contexts/common/validators';
import { CodeEntity } from '@/domain/contexts/contexts/code/entity';
import { z } from 'zod';

export class CodeZodValidator implements ValidatorInterface<CodeEntity> {
  private schema = z.object({ code: z.string() });

  validate(entity: CodeEntity): void {
    try {
      this.schema.parse({
        code: entity.code.getValue(),
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        e.errors.forEach((error) => {
          entity.notification.addError({
            context: 'CodeEntity',
            message: error.message,
          });
        });

        return;
      }

      throw e;
    }
  }
}
