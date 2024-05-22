using Microsoft.AspNetCore.Components;

namespace proKeyboard.classes
{
    public class KeyboardBase : ComponentBase
    {
        [Inject]
        private ILogger<KeyboardBase> Logger { get; set; } = default!;

        public string content { get; set; } =
        "Virtual Keyboard!";

        protected override void OnInitialized()
        {
            Logger.LogInformation("Initialization code of KeyboardBase executed!");
        }
    }
}
