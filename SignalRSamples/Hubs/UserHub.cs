﻿using Microsoft.AspNetCore.SignalR;

namespace SignalRSamples.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;
        public override Task OnConnectedAsync()
        {
            TotalUsers += 1;
            Clients.All.SendAsync("updateTotalUsers",TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers -= 1;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }
        public async Task NewWindowLoaded()
        {
            TotalViews++; 
            await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
        }
    }
}
 