using Microsoft.JSInterop;

namespace proKeyboard.classes
{
    public class KeyboardInterop(IJSRuntime js) : IDisposable
    {
        private readonly IJSRuntime JS = js;
        public async ValueTask<string> CallMessagel(string? name)
        {
            using var objRef = DotNetObjectReference.Create(new HelloHelper(name));
            return await js.InvokeAsync<string>("sayHello1", objRef);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    public class HelloHelper(string? name)
    {
        public string? Name { get; set; } = name ?? "No Name";

        [JSInvokable]
        public string GetHelloMessage() => $"Hello, {Name}!";
    }
}
